import React,{Component} from 'react';
import styles from "./index.scss"
class Mycenter extends Component{
	constructor(){
		super();
		this.state={
			name:"",
			title:""
		}
	}

	componentDidMount(){
		axios.get("/api/wode").then(res=>{
			if(!res.data){
				console.log("111")
				this.props.history.push('/login')
			}else{
				this.setState({
					name:res.data.username
				})
			}
		})
	}
	render() {
		return (
			<div>
			{
				this.state.name?
				<div className={styles.allbox}>
					<div className={styles.top}>
							<span onClick={this.top.bind(this)}>首页</span>
							<span onClick={this.exit.bind(this)}>退出</span>
					</div>
					<div className={styles.my}>
								<span>欢迎来到个人中心:</span>
								<span>{this.state.name}</span>
					</div>
				</div>
				:null
			}
			</div>
		);
	}
	exit(){
		axios.get("/api/unlog").then(res=>{
				if(res.data.result){
					this.props.history.push('/home/login')
				}
		})
	}

	top(){
		this.props.history.push('/home/top')
	}
}

export default Mycenter;