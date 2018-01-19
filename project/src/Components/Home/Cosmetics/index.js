import React,{Component} from "react";
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import axios from "axios";
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
import Footer from '@/Components/footer'
import Product from '@/Components/Product'
import Nav from '@/Components/Home/Nav'
class Crossborder extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	datalist:[],
	  	looplist:[],
	  	sectionlist:[],
	  	loading:true,
	  	movelist:[]
	  }
	    this.current=1;
	    this.total=0;
	}
	componentDidMount(){
		axios.get('/appapi/home/marketingBannerNew/v3?silo_code=11&timestamp=1515995811454&summary=59927e327b650ef1b982cc0b0f4f027b').then(res=>{
             this.setState({
             	datalist:res.data.banners
             })
		})
		axios.get('/appapi/crossborder/getCategoryList/v3?timestamp=1515998948984&summary=57676aa459d6ab8ab77674091655a6d6').then(res=>{
			
             this.setState({
             	looplist:res.data.categroies
             })
		})
		axios.get('/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=1&timestamp=1515999121689&summary=c70e072dba0fd1a6488a446ab4e612ef&platform_code=H5').then(res=>{
				
             this.setState({
  				sectionlist:res.data.eventList
             })
             this.total =res.data.totalPages
		})
		axios.get('/appapi/cms/cmsDetail/v3?silo=2013000100000000011&ids=2041000100000000206,2120000100000000156&timestamp=1516247653457&summary=a8800dc9ee1af2b8f78aa358882caa7c&platform_code=H5').then(res=>{
				console.log(res.data.resultList)
             this.setState({
  				movelist:res.data.resultList
             })
            
		})

 //  Promise.all([axios.get('/appapi/home/marketingBannerNew/v3?silo_code=11&timestamp=1515995811454&summary=59927e327b650ef1b982cc0b0f4f027b'),axios.get('/appapi/crossborder/getCategoryList/v3?timestamp=1515998948984&summary=57676aa459d6ab8ab77674091655a6d6')]).then(res=>{
		
	// 		this.setState({
	// 			  datalist:res.data.banners,
	// 			  looplist:res.data.categroies
	// 		})
				
	// 	})	
	 }
	render() {
		return <div>
                  <Nav myhistory={this.props}/>
		   <ReactSwipe className={styles.carousel} swipeOptions={{continuous: true,auto:2000}} key={this.state.datalist.length}>
				{   

             	this.state.datalist.map(item=>
             		 <img src={item.imgUrlNew} key={item.id} />
             		)
             }

            </ReactSwipe>

            <ul className={styles.biao}>	

             {
             	this.state.looplist.map((item,index)=>
							<li key={index}> <img src={item.categoryImgStr} key={item.id} /> </li>
					)
             }

            </ul>
            <div className={styles.todayChoice}>
            <img src="data:image/png;base64,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"/>
          	</div>
             <div className={styles.huadong}>
            <ul className={styles.tab}>
            {  	
            	this.state.movelist.map((item,index)=>{
            		return(
            				index==1?
            				item.data.map((i,j)=>{
            					return(
            						<li key={i.productId} className={styles.tabchild}><img src={i.picUrl}/>
            						<div>
            						<span>{i.brandName}</span>
            						<p className={styles.shuxie}><nobr>{i.productName}</nobr></p>
            						<span className={styles.price}>{i.price}</span> <span>{i.marketPrice}</span>
                                     <div className={styles.cover}></div>
            						</div>
            						</li>

            						)
            				}):null
            			)
            	})       
             	
            }
            </ul>
            </div>



            <div>
            	
            </div>


            <InfiniteScroll
			    initialLoad={false}
			    threshold={10}
			    loadMore={this.loadMoreFunc.bind(this)}
			    hasMore={this.state.loading}
			    loader={<div className="loader">Loading ...</div>}>
            <ul className={styles.sectionlist}>
             {
             	this.state.sectionlist.map((item,index)=>
							<li key={index} onClick={this.handleClick.bind(this,`${item.eventId}&${item.chineseName}`)}> <img src={item.imageUrl} key={item.id} /> 
								<ul className={styles.sectionlist2}>
             						<li className={styles.board}>{item.siloCategory}
             						<p>{item.englishName}</p>
             						<p>{item.discountText}</p>
             						<p>{item.chineseName}</p>

             						</li>
             					</ul>
             				
             				</li>
           				 
					)
           	  }
             	
            </ul>
            </InfiniteScroll>
           
           <Footer/>



			</div>
		
	}
	handleClick(id){
		
		this.props.history.push(`/product/${id}`)
	}
	loadMoreFunc(){
		console.log(111)
		this.current++;
		if(this.current>this.total){
			this.setState({
				loading:false,
			
			})
			return ;
		}
	 axios.get(`/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=${this.current}&timestamp=1515999121689&summary=c70e072dba0fd1a6488a446ab4e612ef&platform_code=H5`).then(res=>{
				console.log(res.data.eventList)
             this.setState({
  				sectionlist:[...this.state.sectionlist,...res.data.eventList]
             })
		})
	}
}

export default Crossborder;