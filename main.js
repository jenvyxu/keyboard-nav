		//1.初始化数据
		var hashA=init()
		var keys=hashA['keys']
		var hash=hashA['hash']
		//2.生成键盘
		generateKeyboard(keys,hash)
		//3.监听用户动作
		listenToUser(hash)
		//下面的使封装的函数
		function getFromLocalStorage(name){
			return JSON.parse(localStorage.getItem(name)||'null')
		}
		function tag(tagName){
			return document.createElement(tagName)
		}
		function createSpan(textContent){
			var span=tag('span')
			span.className='text'
			span.textContent=textContent
			return span
		}
		function createButton(id){
			var button=tag('button')
			button.textContent='编辑'
			button.id=id
			button.onclick=function(whichkey){
				var button2=whichkey.target
				var img2=button2.nextSibling
				var key=whichkey.target.id//q w e...
				url=prompt('给我一个网址')//qq.com
				hash[key]=url//哈希变更
				img2.src='http://'+url+'/favicon.ico'
				img2.onerror=function(e){
					e.target.src='//i.loli.net/2017/11/10/5a05afbc5e183.png'
				}
				localStorage.setItem('zzz',JSON.stringify(hash))
			}
			return button
		}

		function createImage(domain){
			var img=tag('img')
			if(domain){
				img.src='http://'+domain+'/favicon.ico'	
			}else{
				img.src = './dot.png'
			}
			img.onerror=function(e){
				e.target.src='./dot.png'
			}
			return img
		}

		function init(){
			var keys={
				0:['q','w','e','r','t','y','u','i','o','p'],
				1:['a','s','d','f','g','h','j','k','l'],
				2:['z','x','c','v','b','n','m'],
				length:3
			}
			var hash={
				q:'www.qq.com',w:'weibo.com',e:'ele.me',r:'lagou.com',t:'tmall.com',y:'yahoo.com',u:'y.qq.com',i:'iqiyi.com',o:'opera.com',p:'y.qq.com',
				a:'y.qq.com',s:'v2ex.com',d:'dgtle.com',f:'ctrip.com',g:'sogou.com',h:'huya.com',j:'hexo.io',k:'zhihu.com',l:'suning.com',
				z:'bilibili.com',x:'mi.com',c:'tv.sohu.com',v:'douyu.com',b:'y.qq.com',n:'zhangxinxu.com',m:'taobao.com',
			}
		    //取出localStorage里面的zzz对应的hash
			var hashInLocalStorage=getFromLocalStorage('zzz')
			if(hashInLocalStorage){
				hash=hashInLocalStorage
			}	
			return {"keys":keys,"hash":hash}
		}

		function generateKeyboard(keys,hash){
			for(var index=0;index<keys['length'];index=index+1){
				var div=tag('div')
				div.className='row'

				main.appendChild(div)
				var row=keys[index]
				for(var index2=0;index2<row.length;index2+=1){
					var span=createSpan(row[index2])
			
					var button=createButton(row[index2])

					var img=createImage(hash[row[index2]])

					var kbd=tag('kbd')
					kbd.className='key'

					kbd.appendChild(span)
					kbd.appendChild(button)
					kbd.appendChild(img)

					div.appendChild(kbd)			
					}
				}
		}

		function listenToUser(hash){
			document.onkeypress=function(keydown){
				//keydown包含你所需要的所有信息
				var key=keydown.key
				var website=hash[key]
				//location.href='http://'+website
				//location代表地址栏，href代表地址
				window.open('http://'+website,'_blank')
				//新窗口打开网页
			}	
		}