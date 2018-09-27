import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import style from './test1.less'; 
// import CommonFirst from './components/CommonFirst';
//devDependencies 这些是开发过程要用到的工具依赖 线上不需要这些 --save-dev
//dependencies 这些是代码中要用到的 所以线上也是需要这些的 --save
// let App = React.createClass({
//     render() {
//         <div>first app</div>
//     }
// })

// ReactDOM.render(<APP/>, document.getElementById('app'));

// const test1 = () => {
//     console.log('test2')
// }

//  const arr = [1, 2, 3]
//  const res = arr.find(o => o==2)
//  console.log(res)

// test1()

class FirstComp extends React.Component { 
    //因为react安装的是16版，此时的react已经没有createClass, 所以采用了es6构造函数形式
    // 报错 react2.default.createClass is not a function
    constructor(props) {
        super(props)
        this.state = {
            Com: null
        }
        this.load()
    }

    load () { //动态加载按需加载 
        // import('./components/CommonFirst')动态加载js脚本 相当于执行了jsonp方法
        // 所以会有个回调 也可用async await     await import('./components/CommonFirst')

        // import用法
        //1. import CommonFirst from './components/CommonFirst' 引入某个模块暴露的方法
        //2. import './a.js' 执行这个a.js脚本
        //3.import('./components/CommonFirst')动态加载js脚本

        import('./components/CommonFirst').then((res) => {
            console.log(res)
            this.setState({Com: res.default})
        })
    }
    render() {
        // {style.wrap} 此种写法利用的css modules, 
        //webpack 里的css解析需要'css-loader?modules&localIdentName=[name]-[hash:base64:5]',相当于加了个域（样式作用范围）
        // 页面检查元素就能看出来
        // return <div className={style.wrap}>
        //     <div className={style.firstChid}>firstComponent xiaoli test webpack</div>
        // </div>
        const { Com } = this.state
        return <div className='wrap'>
            <div className='firstChid'>firstComponent xiaoli test webpack </div>
            {/* <div className='secondChid'><CommonFirst/></div> */}
            {Com ? <Com/> : null}
            <div className='thirdChid'>firstComponent xiaoli test webpack </div>
        </div>
    }
}
ReactDOM.render(<FirstComp />, document.getElementById('app'));
// export default FirstComp;