import React,{Component} from 'react';
import styles from "./index.scss"
class Men extends Component{
	constructor(){
		super();
	}
	render() {
		return (
			<div>
				<div className={styles.footer}>  
          	 
            		
            		<p>400-2010-0101</p>
            		<ul>
            			<li>首页</li>
            			<li>客户端</li>
            			<li>登录</li>
            			<li>注册</li>
            		</ul>
            		<p>浙ICP备160092910号</p>
         	  
        	</div>
			</div>
		);
	}
}

export default Men;