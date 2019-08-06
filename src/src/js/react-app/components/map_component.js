import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
// import { loadMapTiles } from '../lib/loadMapTiles';
import { getLocation } from '../actions/location';
import { fetchArticles } from '../actions/articles';
import { showSingle } from '../actions/showSingle';
import { isLoading } from '../actions/internalLoad';
import { isInitialLoading } from '../actions/initialLoad';
import ReactMapboxGl, { Marker, Popup, ZoomControl } from "react-mapbox-gl";
import { SymbolLayout, SymbolPaint } from 'mapbox-gl';
import LoaderInternal from './loader_internal';
import MapPopup from './parts/popup';
import MapClusters from './parts/clusters';
import asyncComponent from '../lib/async_component';
import MapUpdater from './map_updater';

//comment out later
// import style from '../data/mapStyle2';

const Map = ReactMapboxGl({
  accessToken: process.env.MapboxAccessToken
});

//load in routes data async
const RoutesLayers = asyncComponent(() => 
  System.import('./parts/routes_layers').then(module => module.default)
)

const styles: { [key: string]: React.CSSProperties } = {
  //current location marker style
  marker: {
    width: 23,
    height: 23,
    borderRadius: '50%',
    backgroundColor: '#037CFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '4px solid #fff',
    boxShadow: '0, 0, 8px rgba(0,0,0,0.5)',
    cursor: 'pointer',
    //animation
    transform: 'scale(1)',
    transformOrigin: '50% 50%',
    animationName: 'marker-pulse',
    animationDuration: '0.66s',
    animationIterationCount: '4',
    animationDelay: '0.3s',
    animationTimingFunction: 'ease-out',
  },
  zoomControl: {
    position: 'fixed',
    top: 'initial',
    right: 'initial',
    bottom: '134px',
    left: '23px',
    zIndex: 4,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  }
}

const symbolLayout: SymbolLayout = {
  'text-field': '{place}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
};
const symbolPaint: SymbolPaint = {
  'text-color': 'white'
};

const defaultCenter = [ -79.288546, 43.078867 ];
const defaultZoom = [10];

class MapComponent extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      width: '100vw',
      height: '100vh',
      center: defaultCenter,
      locationFound: false,
      bounds: [
          [-79.806701, 42.785684], // Southwest coordinates
          [-78.693060, 43.435308]  // Northeast coordinates
      ],
      hoverData: {},
      zoom: defaultZoom,
      zooming: false,
      currentZoom: 10,
    }

    this.zooming = false;
  }

  componentWillMount() {
    //async load map tiles
    // loadMapTiles();
    //populate point marker info
    this.props.fetchArticles();
    //get your current location
    this.props.getLocation();
  }

  componentDidMount() {
    if(window.location.hash) {
      //give the map some time to load, then open art peice if there's a url hash
      setTimeout(() => {
        this.showArtPeice(window.location.hash.replace('#', ''));
      },1500);
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.location && (prevProps.location !== this.props.location)) {
      this.setState({ locationFound: true });
    }

    if(prevProps.nearMe !== this.props.nearMe) {
      //center on near me location if selected
      if(this.props.nearMe.active) {
        this.focusPoint(this.props.location);
      } else {
        this.setState({ center: defaultCenter });
      }
    }

    if(prevProps.isFocus !== this.props.isFocus) {
      this.focusPoint(this.props.location);
    }

    if(prevProps.filteredRoutes !== this.props.filteredRoutes) {
      //detect if turnig on routes (for loading animation)
      const { filteredRoutes } = this.props;

      //if changing to active state
      if((filteredRoutes[0].active && (!prevProps.filteredRoutes[0].active)) || 
        (filteredRoutes[1].active && (!prevProps.filteredRoutes[1].active)) || 
        (filteredRoutes[2].active && (!prevProps.filteredRoutes[2].active))) {
          this.props.isLoading(true);
      }

      //if changing to inactive state, just run loader for a second
      if(((!filteredRoutes[0].active) && prevProps.filteredRoutes[0].active) || 
        ((!filteredRoutes[1].active) && prevProps.filteredRoutes[1].active) || 
        ((!filteredRoutes[2].active) && prevProps.filteredRoutes[2].active)) {
          //start the loader for just a second
          this.props.dispatch(isLoading(true));
          setTimeout(() => {
            this.props.dispatch(isLoading(false));
          }, 200);
      }
    }
  }

  focusPoint(coords, isCluster) {
    //break up coords to avoid mutate state
    this.setState({ center: [coords[0], coords[1]] });
    if(this.state.currentZoom < 15) {
      this.setState({ zoom: [15] });
    } 
    //if clicked a cluster and already zoomed onece, zoom in agian
    else if ((this.state.currentZoom >= 15) && isCluster) {
      this.setState({ zoom: [19] });
    }
  }

  onMapLoaded() {
    this.props.isInitialLoading(false);
  }

  onZoomStart(map, e) {
    this.zooming = true;
  }

  onZoomEnd(map, e) {
    this.setState({ currentZoom: e.target.transform._zoom })
    this.zooming = false;
  }

  onLocationClick() {
    if(this.state.locationFound) {
      this.focusPoint(this.props.location);
    }
  }

  onClusterClick(coords) {
    this.focusPoint(coords, true);
  }

  onMarkerClick(article, clickedSameLoc) {
    //if not clicked a cluster marker at the same location
    if(!clickedSameLoc) {
      this.focusPoint(article.geometry.coordinates);
    }
    
    if(!this.props.online) {
      //reset first
      this.setState({ hoverData: null })
      //set marker data
      this.setState({ hoverData: article })
    } else {
      this.showArtPeice(article.slug);
    }
  }

  showArtPeice(slug) {
    //display the single entry
    this.props.showSingle(slug);
    //set the url hash
    window.location.hash = slug;
  }

  onMapClick(e) {
    this.props.onMapClick();
  }

  onDragStart() {
    //remove popup (offline) if there is one
    this.setState({ hoverData: null });
  }

  onDataLoaded(e, data) {
    //see when/if rountes data is loaded (has to be called from the map component unfortunately)
    if(data.source.data && (data.isSourceLoaded === true)) { 
     if((data.source.data.name === 'BikeRoutes_JSON') || 
      (data.source.data.name === 'NiagaraTrails_JSON') || 
      (data.source.data.name === 'Wineries.JSON')) {
        this.props.isLoading(false);
     }
    }
  }

  onNetStatus(isOnline) {
    console.log('net status updated: ', isOnline);
  }

  // style={this.props.mapStyle}
  // style={style}

  render() {
    return (
      <LoaderInternal>
        <Map
          style={this.props.mapStyle}
          containerStyle={{
            height: this.state.height,
            width: this.state.width
          }}
          maxBounds={this.state.bounds}
          center={this.state.center}
          onClick={this.onMapClick.bind(this)}
          onDragStart={this.onDragStart.bind(this)}
          onStyleLoad={this.onMapLoaded.bind(this)}
          minZoom={0}
          maxZoom={20}
          onZoomStart={this.onZoomStart.bind(this)}
          onZoomEnd={this.onZoomEnd.bind(this)}
          // flyToOptions={{
          //   zoom: 14,
          // }}
          zoom={ this.state.zoom }
          //fired when data from layers, etc get loaded
          onSourceData={this.onDataLoaded.bind(this)}
          >
          <ZoomControl
            style={styles.zoomControl}
            className="zoom-control"
          />
          <RoutesLayers/>
          <MapClusters
            // onHover={this.onHoverMarker.bind(this)} 
            // onHoverLeave={this.onHoverLeaveMarker.bind(this)} 
            onMarkerClick={this.onMarkerClick.bind(this)} 
            onClusterClick={this.onClusterClick.bind(this)}
          />
          <MapPopup 
            data={this.state.hoverData}
          />
          {
            this.state.locationFound &&
            <Marker
              coordinates={this.props.location}
              anchor="bottom"
              style={styles.marker}
              onClick={this.onLocationClick.bind(this)}
              >
            </Marker> 
          }
        </Map>

      </LoaderInternal>
    );
  }

  // <MapStyleLayer/>
}

function mapStateToProps(state) {
  return {
    location: state.map.location,
    mapStyle: state.mapStyle.mapStyle,
    nearMe: state.nearMe.nearMe,
    isFocus: state.nearMe.isFocus,
    filteredRoutes: state.routes.route,
    online: state.isOnline.online
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
    fetchArticles: fetchArticles,
    getLocation: getLocation,
    showSingle: showSingle,
    isLoading: isLoading,
    isInitialLoading: isInitialLoading,
  },dispatch)
}

//one loader for initial load wraps one loader for updating/loading components display
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);