import React, { Component } from 'react';
import { ShareButtons } from "react-share";
import { SocialIcon } from 'react-social-icons';

const {
  FacebookShareButton,
  // GooglePlusShareButton,
  // LinkedinShareButton,
  TwitterShareButton,
  // TelegramShareButton,
  // WhatsappShareButton,
  PinterestShareButton,
  // VKShareButton,
  // OKShareButton,
  // RedditShareButton,
  EmailShareButton,
} = ShareButtons;

class renderField extends Component {

	constructor(props) {
		super(props);
		this.state = {
			openClass: ''
		}
	}

	onOpenClick(e) {
		//open
		this.setState({ openClass: 'open' });
	}

	onCloseClick(e) {
		//close
		this.setState({ openClass: 'close' });
	}

	render() {
		const { input, classProp, pageUrl, featuredImg } = this.props;
		return (
			<div className="socials-share">
				<a onClick={this.onOpenClick.bind(this)} className="share-icons-button "></a>
				<div className={`socials-share-popup ${this.state.openClass}`}>
					<FacebookShareButton 
						url={pageUrl} 
					/>
					<TwitterShareButton 
						url={pageUrl} 
					/>
					<PinterestShareButton 
						url={pageUrl}
						media={featuredImg}
					/>
					<SocialIcon url="https://www.instagram.com/" style={{ height: 35, width: 35 }} />
					<div onClick={this.onCloseClick.bind(this)} className="social-share-close"></div>
				</div>
			</div>
		);
	}
}

					//<a className="social facebook"></a>

export default renderField;