import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import { connect } from 'react-redux';

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, UPLOADS_PATH } = require('../../config')[env];
import { imgName } from '../../lib/stringUtils';

const styles: { [key: string]: React.CSSProperties } = {
	popup: {
	  boxShadow: '0 0 15px rgba(0, 0, 0, 0.25)',
	}
}

class MapPopup extends Component {

	constructor(props) {
	  super(props);
	  this.state = { 
	  };
	}

	render() {
		const { data } = this.props;
		return (
			<div>
				{
				(data && data.geometry) &&
				  <Popup
				    className="marker-popup"
				    coordinates={[data.geometry.coordinates[0], data.geometry.coordinates[1]]}
				    //right, down
				    offset={[88, -86]}
				    style={styles.popup}
				    >
				    <div className={`popup-content`}>
				    	<div className="left">
				    	{ data.images[0] ?
				    		<div className='popup-thumb' style={{ backgroundImage: `url(${ROOT_URL + UPLOADS_PATH + imgName(data.images[0].source, 'small')})` }} ></div>
				    		:
				    		<div className='popup-thumb' style={{ backgroundImage: `url(${ROOT_URL}/assets/img/placeholder-images/placeholder-img-sml.jpg)` }} ></div>
				    	}
				    	</div>
				    	{	(this.props.lang === 'fr') ?
				    		<div className="right">
				    			<span className="info title">{data.fr_title}</span>
				    			<span className="info">{data.fr_location}</span>
				    		</div>
				    		:
				    		<div className="right">
				    			<span className="info title">{data.title}</span>
				    			<span className="info">{data.location}</span>
				    		</div>
				    	}
				    </div>
				  </Popup>
				}
			</div>
			);
	}

}

function mapStateToProps(state) {
	return {
		lang: state.language.lang
	}
}

export default connect(mapStateToProps)(MapPopup);