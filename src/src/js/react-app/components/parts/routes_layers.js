import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactMapboxGl, { GeoJSONLayer} from "react-mapbox-gl";

import bikeRoutesData from '../../data/bikeRoutes.json';
import trailRoutesData from '../../data/trails.json';
import wineRoutesData from '../../data/wineRoutes.json';
import { SymbolLayout, SymbolPaint, CircleLayout, CirclePaint } from 'mapbox-gl';

const symbolLayout: SymbolLayout = {
              "text-field": "{Name}",
              // offset: right, down
              "text-offset": [0, -0.7],
              "text-anchor": "bottom",
              "text-size": 10,
              //"icon-image": "marker-15",
              // "icon-size": 3,
            };
const symbolPaint: SymbolPaint = {
  //"icon-color": '#80C342'
};
const bikingSymbolLayout: SymbolLayout = {
              "text-field": "{Tour}",
              "text-offset": [0, -0.7],
              "text-anchor": "bottom",
              "text-size": 10,
            };

const wineCircleLayout: CircleLayout = {
                "visibility": "visible"
            };
const wineCirclePaint: CirclePaint = {
  "circle-color": '#80C342'
};

class routesLayers extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    	<div>
    	{this.props.filteredRoutes[0].active &&
          <div>
        	  <GeoJSONLayer
        	    data={bikeRoutesData}
        	    lineLayout={{
        	      "line-join": "round",
        	      "line-cap": "round"
        	      }}
        	    linePaint={{
        	      "line-color": '#EE2E62',
        	      "line-width": 2
        	      }}
        	  />
              <GeoJSONLayer
                data={bikeRoutesData}
                symbolLayout={bikingSymbolLayout}
              />
          </div>
    	}
    	{this.props.filteredRoutes[1].active &&
          <div>
        	  <GeoJSONLayer
        	    data={trailRoutesData}
        	    lineLayout={{
        	      "line-join": "round",
        	      "line-cap": "round"
        	      }}
        	    linePaint={{
        	      "line-color": '#FAA627',
        	      "line-width": 2
        	      }}
        	  />
              <GeoJSONLayer
                data={trailRoutesData}
                symbolLayout={symbolLayout}
                symbolPaint={symbolPaint}
              />
          </div>
    	}
    	{this.props.filteredRoutes[2].active &&
          <div>
        	  <GeoJSONLayer
        	    data={wineRoutesData}
                symbolLayout={symbolLayout}
                symbolPaint={symbolPaint}
        	  />
              <GeoJSONLayer
                data={wineRoutesData}
                circleLayout={wineCircleLayout}
                circlePaint={wineCirclePaint}
              />
          </div>
    	}
    	</div>
    );

  }
}

function mapStateToProps(state) {
  return {
  	filteredRoutes: state.routes.route,
  }
}

export default connect(mapStateToProps)(routesLayers);