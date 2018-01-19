import React,{Component} from 'react';
import styles from "./index.scss"
import Nav from '@/Components/Home/Nav'
import Footer from "@/Components/footer"

class Upcoming extends Component{
	constructor(){
		super();
		this.state={
			data:null,
			newDate:null,
			title:null
		}
	}
componentDidMount(){
	axios.get("/appapi/upcoming/index/v3?platform_code=H5&summary=50da6c997090db64f78b2549b374ca62").then(res=>{
		this.setState({
			data:res.data,
			newDate:res.data.lists[0].events[0].startDate,
			title:res.data.tips

		})
		this.countdown.bind(this,res.data.lists[0].events[0].startDate)()
	})



}
	render() {
		return (
			<div>
				<Nav myhistory={this.props}/>
				{
					this.state.newDate?
					<h2 className={styles.data} id="t_t">距离开场还剩下<span id="t_h"></span>小时</h2>
					:null
				}
				{
					this.state.title?
					<p className={styles.title}>{this.state.title}</p>
					:null

				}	
				<div className={styles.newProduct}>
				{
					this.state.data?
					this.state.data.lists[0].events.map((item,index)=>{
						return(
								<div key={item.categoryId} onClick={this.handleClick.bind(this,`${item.eventId}&${item.englishName}`)}>
									<img src={item.imageTmallUrl} key={item.categoryId}/>
									<p className={styles.one}>{item.englishName}</p>
									<p className={styles.two}>{item.chineseName}</p>
									<p className={styles.thr}>{item.discount}</p>
									<p className={styles.for}>开售提醒</p>
								</div>
							)
					}):null
				}
				</div>
				<Footer/>
			</div>
		);
	}
	handleClick(id){		
		this.props.history.push(`/product/${id}`)
	}


	countdown(time){
		var EndTime= new Date(time);
		   var NowTime = new Date();
		   var t =EndTime.getTime() - NowTime.getTime();
		   var h=0;
		   if(t>=0){
		     h=Math.floor(t/1000/60/60%24);
		   }
		   document.getElementById("t_h").innerHTML =h;
	}

}

export default Upcoming;