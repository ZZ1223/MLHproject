import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import "./index.scss"
import styles from "./index.scss"
import "@/assets/iconfont/iconfont.css"
class Nav extends Component{
	constructor(){
		super();
		this.handleScroll = this.handleScroll.bind(this)
	}
	componentDidMount(){
		 window.addEventListener('scroll', this.handleScroll);
	}
	handleScroll(){
		var uls = document.querySelectorAll("ul");
		var ulTop = uls[1].offsetTop
		var t =document.documentElement.scrollTop||document.body.scrollTop;
		if(ulTop<t){
			uls[1].style.position="fixed";
			uls[1].style.top="0px";		
		}else{
			uls[1].style.position="static";
		}
	}
	componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
	render() {
		return (
				<div>
					<ul className={styles.top}>
						<li className={styles.l} onClick={this.mycenter.bind(this)}><i className="iconfont icon-account"></i></li>
						<li className={styles.m}><NavLink to="/home/search">KENZO</NavLink></li>
						<li className={styles.r}><i className="iconfont icon-cart"></i></li>
					</ul>
						<ul className={styles.nav} id="navUl">
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/top" activeClassName={styles.active}>推荐</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/newarrival" activeClassName={styles.active}>新品</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/crossborder" activeClassName={styles.active}>海外</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/women" activeClassName={styles.active}>女士</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/men" activeClassName={styles.active}>男士</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/cosmetics" activeClassName={styles.active}>美妆</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/liftstyle" activeClassName={styles.active}>家居</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/kids" activeClassName={styles.active}>婴童</NavLink>
							</li>
							<li className={styles.nav}>
								<NavLink className={styles.nav} to="/home/upcoming" activeClassName={styles.active}>即将上新</NavLink>
							</li>
						</ul>
			</div>
		);
	}

	mycenter(){
		this.props.myhistory.history.push('/mycenter')
	}
}

export default Nav;