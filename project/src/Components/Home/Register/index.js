import React,{Component} from 'react';
import styles from "./index.scss"
class Register extends Component{
	constructor(){
		super();
		this.state={
			title:""
		}
	}
	render() {
		return (
			<div className={styles.allbox}>
					<div className={styles.top}>
							<span onClick={this.top.bind(this)}>返回首页</span>
							<span>注册</span>
							<span onClick={this.login.bind(this)}>登陆</span>
					</div>
					<div className={styles.myform}>
						<input type="text" ref="username" placeholder="请输入用户名"/><br/>
						<input type="password" ref="password" placeholder="请输入密码"/><br/>
						<button onClick={this.register.bind(this)}>注册</button>
						{
							this.state.title?
							<p>{this.state.title}</p>
							:null
						}
						
					</div>
			</div>
		);
	}


	register(){
		axios.post("/api/register",{
			username:this.refs.username.value,
			password:this.refs.password.value
		}).then(res=>{
			if(res.data.result){
				this.setState({
					title:res.data.message
				})
				this.props.history.push('/login')
			}else{
				this.setState({
					title:res.data.message
				})
			}
		})
	}
		login(){
			this.props.history.push('/login')
		}
		top(){
			this.props.history.push('/home/top')
		}

}

export default Register;