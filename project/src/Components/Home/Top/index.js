import React,{Component} from 'react';
import ReactSwipe from 'react-swipe';
import styles from "./index.scss"
import Footer from "@/Components/footer"
import Nav from '@/Components/Home/Nav'
class Index extends Component{
	constructor(){
		super();
		this.state={
			banner:[],
			appBanner:[],
			newProduct:[],
		}
	}
	componentDidMount(){
		axios.get("/appapi/home/marketingBannerNew/v3?timestamp=1516005408657&summary=24bff246f758dd3a70f3b05da49ccc59").then(res=>{
			this.setState({
				banner:res.data.banners
			})
		})

		axios.get("/appapi/home/appBanner/v3?type=9").then(res=>{
			this.setState({
				appBanner:res.data.resultList
			})
		})

		axios.get("/appapi/home/eventForH5?params=%7B%7D").then(res=>{
			this.setState({
				newProduct:res.data.lists
			})
		})
	}
	render() {
		return (
			<div>
			<Nav myhistory={this.props}/>
				<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:2000}} key={this.state.banner.length}>
					{
						this.state.banner.map(item=>{
							return(
								item.imgUrl?
								<img className={styles.img} src={item.imgUrl} key={item.id}/>
								:null
							)
						})
					}
				</ReactSwipe>	
				<div className={styles.m}>
					{
						this.state.appBanner.map(item=>{
							return(
								item.backImage?
								<img className={styles.appimg} src={item.backImage} key={item.title}/>
								:
								<div className={styles.image} key={item.title}>
								<h4>{item.name}</h4>
								<p>{item.title}</p>
								<img className={styles.appimg} src={item.image} key={item.title}/>
								</div>
								)
						})
					}
				</div>
				<img className={styles.top}src="data:image/png;base64,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"/>
				<div className={styles.newProduct}>
					{
						this.state.newProduct.length>0?
						this.state.newProduct[0].events.map((item,index)=>{
							return(
								<div key={item.urlkey} onClick={this.handleClick.bind(this,`${item.eventId}&${item.chineseName}`)}>
								<img src={item.imageUrl} key={item.urlkey}/>
								<p className={styles.one}>{item.englishName}</p>
								<p className={styles.two}>{item.chineseName}</p>
								<p className={styles.thr}>{item.discountText}</p>
								</div>
							)
						})
						:null
					}
				</div>
				<img className={styles.hot} src="data:image/png;base64,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"/>
				<div className={styles.hot}>
					{
						this.state.newProduct.length>0?
						this.state.newProduct[1].events.map((item,index)=>{
							return(
								<div key={item.urlkey} onClick={this.handleClick.bind(this,item.eventId)}>
								<img src={item.imageUrl} key={item.urlkey}/>
								<p className={styles.one}>{item.englishName}</p>
								<p className={styles.two}>{item.chineseName}</p>
								<p className={styles.thr}>{item.discountText}</p>
								</div>
							)
						})
						:null
					}
				</div>
				<Footer/>
			</div>
		);
	}
	handleClick(id){		
		this.props.history.push(`/product/${id}`)
	}

}

export default Index;