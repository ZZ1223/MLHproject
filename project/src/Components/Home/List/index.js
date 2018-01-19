import React,{Component} from 'react';
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
import "@/assets/iconfont/iconfont.css"
import {NavLink} from 'react-router-dom'
class List extends Component{
	constructor(){
		super();
		this.state={
			datalist:[],
			loading:true
		}
		this.current=1;
		this.total=2;
	}
	componentDidMount(){
		axios.get(`/appapi/search/searchKey/v3?pageIndex=1&q=${this.props.match.params.id}
			&sort=&key=&searchKeyWord=${this.props.match.params.id}`).then(res=>{
				this.setState({
					datalist:res.data.products
				})
				this.total=res.data.totalPages
				this.listenSearch.bind(this)(); 
		})
		this.searchInput.bind(this)()
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
					<span  className={styles.top}><NavLink to="/home/search"><i className="iconfont icon-back"></i></NavLink></span>
					  <div className={styles.one}>
					   <span className={styles.one}><i className="iconfont icon-search"></i></span>
						<input type="text" ref="searchInput"/>
					  </div>
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
				    threshold={10}
				    loadMore={this.loadMoreFunc.bind(this)}
				    hasMore={this.state.loading}
				    loader={<div className="loader">Loading ...</div>}>
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

loadMoreFunc(){
			this.current++;
			if(this.current>this.total){
				this.setState({
					loading:false,				
				})
				return ;
			}
			 axios.get(`/appapi/search/searchKey/v3?pageIndex=${this.current}&q=${this.refs.searchInput.value}
			&sort=&key=&searchKeyWord=${this.refs.searchInput.value}`).then(res=>{
					
	             this.setState({
	  				datalist:[...this.state.datalist,...res.data.products]
	             })
			})
	}
listenSearch(){
        document.querySelector('input').onkeydown=(event)=>{
        if (event.keyCode == 13){
        	axios.get(`/appapi/search/searchKey/v3?pageIndex=1&q=${this.refs.searchInput.value}
			&sort=&key=&searchKeyWord=${this.refs.searchInput.value}`).then(res=>{
				this.setState({
					datalist:res.data.products
				})
				this.current=1
        	})
          }
      } 
    }
	searchInput(){
		this.refs.searchInput.value=this.props.match.params.id
	}
	handleClick(id){
		this.props.history.push(`/productlist/${id}`)
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

export default List;