import React,{Component} from 'react';
import axios from "axios";
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'
import "@/assets/iconfont/iconfont.css"
class Product extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	datalist:[],
	  	loading:true,
	  	title:null
	  }
		this.current=1;
		this.total=2;
	}
	componentDidMount(){
		this.setState({
			title:this.props.match.params.id.split("&")[1]
		})		
	  axios.get(`/appapi/event/product/v3?pageIndex=1&categoryId=${this.props.match.params.id.split("&")[0]}`).then(res=>{
             console.log(res.data.products)
             this.setState({
             	datalist:res.data.products
             })
             this.total =res.data.totalPages
		})
	  window.onscroll = function() {
	  	var scrollTop = document.documentElement.scrollTop ? 
	  					document.documentElement.scrollTop :
	  					document.body.scrollTop;
	  	var red = document.getElementById('fanhui');
	  	if(scrollTop >=1000) {
	  		red.style.display = 'block';
	  	} else {
	  		red.style.display = 'none';
	  	}
	  }
	}
	render() {
		return (
			<div>

				<div className={styles.top}>
					<span><a onClick={this.goback.bind(this)}><i className="iconfont icon-back"></i></a></span>
					<span>{this.state.title}</span>
					<span><NavLink to="/home/top"><i className="iconfont icon-category"></i></NavLink></span>
				</div>

				<ul className={styles.header}>
					<li>人气</li>
					<li>折扣</li>
					<li>价格</li>
					<li>筛选</li>
				</ul>
				<div id="fanhui" onClick={this.go2Top.bind(this)}className={styles.fanhui}><i className="iconfont icon-less"></i></div>
				 <InfiniteScroll
				 	initialLoad={false}
				     loadMore={this.loadMoreFun.bind(this)}
				     threshold={10}
				     hasMore={this.state.loading}
				     loader={<div className="loader">Loading ...</div>}

			    >
			<ul className={styles.bao}>
				{
					this.state.datalist.map((item,index)=>
			 		   <li key={index} onClick={this.handleClick.bind(this,item.productId)}><img src={item.imageUrl} key={item.id} />
			 		   <span>海外直发</span> <span>当季新品</span>
			 		   <p>{item.brandName}</p>
			 		   <span className={styles.line}><nobr>{item.productName}</nobr></span>
			 		   <p><span>{item.price}</span><span>{item.marketPrice}</span><span>{item.discount}</span></p>
			 		   </li>
			    	)
				}

			</ul>
			 </InfiniteScroll>
			 
			</div>

		);
	}
	loadMoreFun(){
		if(this.current>=this.total){
			this.setState({
				loading:false
			})
			console.log("没了")
			return;
		}
		console.log(this.current,this.total)
			this.current++
			  axios.get(`/appapi/event/product/v3?pageIndex=${this.current}&categoryId=${this.props.match.params.id.split("&")[0]}`).then(res=>{
		             console.log(res.data.products)
		             this.setState({
		             	datalist:[...this.state.datalist,...res.data.products]
		             })
				})

}
		handleClick(id){
			this.props.history.push(`/productlist/${id}`)
		}


		goback(){
			window.history.back()
		}


		pageScroll(){ 
			
		} 
		go2Top () {
					var id = setInterval(function () {
						document.documentElement.scrollTop -= 200;
						document.body.scrollTop -= 200;
						var scrollTop = document.documentElement.scrollTop ? 
									document.documentElement.scrollTop :
									document.body.scrollTop;
						if (scrollTop === 0) {
							clearInterval(id)
						}
					}, 20)
					
				}

}
export default Product;