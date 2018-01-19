import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import styles from "./index.scss"
class Home extends Component{
	constructor(){
		super();
		this.state={
		}
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}

	navMove(e){
		var navUl = document.getElementById('navUl');
		var downX = e.touches[0].clientX;
		var downLeft = navUl.offsetLeft;
		var This = this
		window.ontouchmove=function(e){
			var diffX =e.touches[0].clientX - downX;
			navUl.style.left = downLeft + diffX + 'px';
			return false;
		}
		window.ontouchend = function () {
			window.onmousemove = null;
			window.onmouseup = null;
			return false;
		}
		return false;
	}
}

export default Home;