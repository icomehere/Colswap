      //const desiredNetwork = '11155111';          

      //var wethAddress = "0x3823Efe73B61f2e3E5988e873fAd110c2224aEd7"; 
      //var usdcAddress = "0x157921a7296c8e61240C2d7ea675D64D743f9f23"; 
      var wtrxAddress = "TCGad7X1FZAp8Qw233ocj62ZnNU4FKwAR6"; 
      var usdtAddress = "TJWZP54oUgfTX8Fe7b8FgwzbZgSz3LsVUi"; 
      var colAddress = "TUQA3n1QxaTLNgLFVYPjg3sP85KtL1zMWQ"; 
      var routerAddress = "TU4YMhCoTB8TT6yNAG8MQLUTaT46YL3Yqy"; 
      var factoryAddress = "TGpMN9KAtSH8NxxgJD5JqVjDLidVm24cds"; 
      var col_usdtAddress = "TTxJ8fLJkAPEokTk8pcqB7KLkB9hfgyBxr"; 
      var wtrx_usdtAddress = "TQVGMFd3L7eifx7oGR1F6sn1KBefkrRYK5"; 
      

  
      //var web3;     
      //var weth;
      //var usdc;
      var tronWeb;
      var wtrx;
      var col;
      var usdt;
      var router;
      var factory;
      var col_usdt;
      var wtrx_usdt;
      var userAccount;
      /*
      var total = 0;
      var flag = 0;
      var wordsArray=["Come on!","Anybody here?","I'm so bored!","Here is your grandpa!","Where is the little chick?",
          "Let me send you to see Marx!","I'll kick your ass!","Let me give you some color see see!","I'll beat the hell out of you!","I will punch your shining teeth through the back of your skull!"];
      var resultsArray=[
          "LOS's eggs are broken by WIN !",
          "WIN has scared the shit out of LOS!",
          "Oh,LOS is killed by WIN !",
          "Hurray! WIN has defeated LOS !",
          "Let's congratulate the King WIN ! Poor LOS is dead!",
          "Here comes the King WIN !LOS escaped!",
          "LOS:King WIN, please accept my knees!",
          "LOS:WIN,you are damnly fierce!",
          "WIN:LOS,have a good time with Marx!",
          "WIN:LOS,may you rest in peace!"]; 
          
 
 
       
          
      function getTronweb1(){
            var obj = setInterval(async ()=>{
                if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                    clearInterval(obj)
                    document.write("Yes, catch it:",window.tronWeb.defaultAddress.base58)
                }
            }, 10);
        }
        
      function startApp() {      
          if (typeof window.ethereum === 'undefined') {
              alert('Looks like you need a Dapp browser to get started.');
              alert('Consider installing MetaMask!');
          } else {
              var provider = window['ethereum'] || window.web3.currentProvider;
              web3 = new Web3(provider);
              weth = new web3.eth.Contract(wethABI, wethAddress);
              usdt = new web3.eth.Contract(usdtABI, usdtAddress);
              usdc = new web3.eth.Contract(usdcABI, usdcAddress);
              col = new web3.eth.Contract(colABI, colAddress);
              router = new web3.eth.Contract(routerABI, routerAddress);
              factory = new web3.eth.Contract(factoryABI, factoryAddress); 
              col_usdt = new web3.eth.Contract(pairABI, col_usdtAddress); 


              ethereum.enable().then(function (accounts) {
                  if(ethereum.networkVersion != desiredNetwork) {
                      document.getElementById("B0").innerHTML = "Wrong network ! ! !"
                  } else {             
                      userAccount = accounts[0];                 
                      document.getElementById("B0").innerHTML = userAccount;
                      checkApprove();
                      showBalanceAll();
                      refresh();
                  }
              })
          }          
      }
      */

      async function getTronweb(){      	
        if (window.tronLink.ready) {
          tronWeb = tronLink.tronWeb;
          userAccount = tronWeb.defaultAddress.base58;
          document.getElementById("B0").innerHTML = userAccount;
          wtrx = tronWeb.contract(wtrxABI, wtrxAddress);
          usdt = tronWeb.contract(usdtABI, usdtAddress);
          col = tronWeb.contract(colABI, colAddress);
          router = tronWeb.contract(routerABI, routerAddress);
          factory = tronWeb.contract(factoryABI, factoryAddress);
          col_usdt = tronWeb.contract(pairABI, col_usdtAddress);
          wtrx_usdt = tronWeb.contract(pairABI, wtrx_usdtAddress);
          //let ba = await wtrx.name().call();alert(ba);
          //let de = await wtrx.deposit().send({callValue:1000000});
          showBalanceAll();
          
        } else {
          /*
          const res = await tronLink.request({ method: 'tron_requestAccounts' });
          if (res.code === 200) {
            tronWeb = tronLink.tronWeb;
          }*/
        }
        //return tronWeb;
      }

      async function showBalance(sid) {
      	var tid;
      	var amount;
      	switch (sid) {
      	  case "S1":
      	    tid = "T1";
      	    break;
      	  case "S2":
      	    tid = "T2";
      	    break;
      	  default:
      	    break;
      	}
      	switch (document.getElementById(sid).value) {
          case "wtrx":
            document.getElementById(tid).value = await wtrx.balanceOf(userAccount).call()/1e6;
            break;
          case "col":
            document.getElementById(tid).value = await col.balanceOf(userAccount).call()/1e18;
            break;
          case "usdt":
            document.getElementById(tid).value = await usdt.balanceOf(userAccount).call()/1e6;
            break;
          default:
            break; 
        } 
      }
      
      async function showBalanceAll() {
        showBalance("S1");
        showBalance("S2");
        showPoolBalance();
      }
      
      async function maxAmount() {
        /*
        switch (document.getElementById("S1").value) {
          case "wtrx":
            document.getElementById("N1").value = await wtrx.balanceOf(userAccount).call()/1e6;
            break;
          case "col":
            document.getElementById("N1").value = await col.balanceOf(userAccount).call()/1e18;
            break;
          case "usdt":
            document.getElementById("N1").value = await usdt.balanceOf(userAccount).call()/1e6;
            break;
          default:
            break; 
          } 
          */
        document.getElementById("N1").value = document.getElementById("T1").value;
      }
      
      async function showResult() {
      	var tokenA = document.getElementById("S1").value;
      	var tokenB = document.getElementById("S2").value;
      	var amount = document.getElementById("N1").value*100;
      	var r;
      	var r0;
      	var r1;
      	document.getElementById("N2").value = "";
        if(tokenA=="wtrx"&&tokenB=="col") {
          r = await wtrx_usdt.getReserves().call();
          r0 = r._reserve0/1e4;
          r1 = r._reserve1/1e4; 
          amount = (r1-r0*r1/(r0*1+amount));
          r = await col_usdt.getReserves().call();
          r0 = r._reserve0/1e16;
          r1 = r._reserve1/1e4;        
          document.getElementById("N2").value = (r0-r0*r1/(r1*1+amount))/100; 
        }
        if(tokenA=="wtrx"&&tokenB=="usdt") {
          r = await wtrx_usdt.getReserves().call();
          r0 = r._reserve0/1e4;
          r1 = r._reserve1/1e4;        
          document.getElementById("N2").value = (r1-r0*r1/(r0*1+amount))/100;  
        }
        if(tokenA=="col"&&tokenB=="wtrx") {
          r = await col_usdt.getReserves().call();
          r0 = r._reserve0/1e16;
          r1 = r._reserve1/1e4;        
          amount = (r1-r0*r1/(r0*1+amount));  
          r = await wtrx_usdt.getReserves().call();
          r0 = r._reserve0/1e4;
          r1 = r._reserve1/1e4;        
          document.getElementById("N2").value = (r0-r0*r1/(r1*1+amount))/100; 
        }
        if(tokenA=="col"&&tokenB=="usdt") {
          r = await col_usdt.getReserves().call();
          r0 = r._reserve0/1e16;
          r1 = r._reserve1/1e4;        
          document.getElementById("N2").value = (r1-r0*r1/(r0*1+amount))/100;            
        }
        if(tokenA=="usdt"&&tokenB=="wtrx") {
          r = await wtrx_usdt.getReserves().call();
          r0 = r._reserve0/1e4;
          r1 = r._reserve1/1e4;        
          document.getElementById("N2").value = (r0-r0*r1/(r1*1+amount))/100;   
        }
        if(tokenA=="usdt"&&tokenB=="col") {
          r = await col_usdt.getReserves().call();
          r0 = r._reserve0/1e16;
          r1 = r._reserve1/1e4;        
          document.getElementById("N2").value = (r0-r0*r1/(r1*1+amount))/100;                
        }
      }

      async function swapToken() {
      	var tokenA = document.getElementById("S1").value;
      	var tokenB = document.getElementById("S2").value;
      	var amount = document.getElementById("N1").value*1e2;
        if(tokenA=="wtrx"&&tokenB=="col") {
          router.swapExactTokensForTokens(amount+"0000","100",[wtrxAddress,usdtAddress,colAddress],userAccount).send();
        }
        if(tokenA=="wtrx"&&tokenB=="usdt") {
          router.swapExactTokensForTokens(amount+"0000","100",[wtrxAddress,usdtAddress],userAccount).send();
        }
        if(tokenA=="col"&&tokenB=="wtrx") {
          router.swapExactTokensForTokens(amount+"0000000000000000","100",[colAddress,usdtAddress,wtrxAddress],userAccount).send();
        }
        if(tokenA=="col"&&tokenB=="usdt") {
          router.swapExactTokensForTokens(amount+"0000000000000000","100",[colAddress,usdtAddress],userAccount).send();
        }
        if(tokenA=="usdt"&&tokenB=="wtrx") {
          router.swapExactTokensForTokens(amount+"0000","100",[usdtAddress,wtrxAddress],userAccount).send();
        }
        if(tokenA=="usdt"&&tokenB=="col") {
          router.swapExactTokensForTokens(amount+"0000","100",[usdtAddress,colAddress],userAccount).send();
        }	
      }

      async function showPoolBalance() {
      	var totalSupply;
      	var balance;
      	var r;
      	var r0;
      	var r1;
      	if(document.getElementById("S1").value=="col") {
      	  totalSupply = await col_usdt.totalSupply().call(); 
      	  balance = await col_usdt.balanceOf(userAccount).call();
          r = await col_usdt.getReserves().call();
          r0 = r._reserve0/1e18;
          r1 = r._reserve1/1e6;
          document.getElementById("T11").value = balance*r0/totalSupply;
          document.getElementById("T21").value = balance*r1/totalSupply;
        }
        if(document.getElementById("S1").value=="wtrx") {
      	  totalSupply = await wtrx_usdt.totalSupply().call(); 
      	  balance = await wtrx_usdt.balanceOf(userAccount).call();
          r = await wtrx_usdt.getReserves().call();
          r0 = r._reserve0/1e6;
          r1 = r._reserve1/1e6;
          document.getElementById("T11").value = balance*r0/totalSupply;
          document.getElementById("T21").value = balance*r1/totalSupply;
        }
      }

      async function showPairVolume(nid)  {
      	var r;
      	var r0;
      	var r1;
      	if(nid=="N1") {
      	  if(document.getElementById("S1").value=="col") {
            r = await col_usdt.getReserves().call();
            r0 = r._reserve0/1e18;
            r1 = r._reserve1/1e6;         
            document.getElementById("N2").value = (document.getElementById("N1").value*r1/r0).toFixed(2);
          }
          if(document.getElementById("S1").value=="wtrx") {
            r = await wtrx_usdt.getReserves().call();
            r0 = r._reserve0/1e6;
            r1 = r._reserve1/1e6;         
            document.getElementById("N2").value = (document.getElementById("N1").value*r1/r0).toFixed(2);
          }       	
      	}
      	if(nid=="N2") {
      	  if(document.getElementById("S1").value=="col") {
            r = await col_usdt.getReserves().call();
            r0 = r._reserve0/1e18;
            r1 = r._reserve1/1e6;            
            document.getElementById("N1").value = (document.getElementById("N2").value*r0/r1).toFixed(2);
          }
          if(document.getElementById("S1").value=="wtrx") {
            r = await wtrx_usdt.getReserves().call();
            r0 = r._reserve0/1e6;
            r1 = r._reserve1/1e6;            
            document.getElementById("N1").value = (document.getElementById("N2").value*r0/r1).toFixed(2);
          }       	
      	}
      }

      async function maxAmount_pool(mid) {
      	if(mid == "M1") {
      	  document.getElementById("N1").value = document.getElementById("T1").value;
      	}
      	if(mid == "M2") {
      	  document.getElementById("N1").value = document.getElementById("T11").value;
      	}
      	if(mid == "M3") {
      	  document.getElementById("N2").value = document.getElementById("T2").value;
      	}
      	if(mid == "M4") {
      	  document.getElementById("N2").value = document.getElementById("T21").value;
      	}
      }

      async function addLiquidity() {
      	var amountA;
        var amountAMin;
        var amountB = document.getElementById("N2").value*1e6+"";
        var amountBMin = document.getElementById("N2").value*0.8*1e6+"";
        if(document.getElementById("S1").value=="col") {
          amountA = document.getElementById("N1").value*1e18+"";
          amountAMin = document.getElementById("N1").value*0.8*1e18+"";
          await router.addLiquidity(colAddress,usdtAddress,amountA,amountB,amountAMin,amountBMin,userAccount,"1823122819").send();
        }
        if(document.getElementById("S1").value=="wtrx") {
          amountA = document.getElementById("N1").value*1e6+"";
          amountAMin = document.getElementById("N1").value*0.8*1e6+"";
          await router.addLiquidity(wtrxAddress,usdtAddress,amountA,amountB,amountAMin,amountBMin,userAccount,"1823122819").send();
        }
      }

      async function withdrawLiquidity() {
      	var liq;
        if(document.getElementById("S1").value=="col") {
          liq = await col_usdt.balanceOf(userAccount).call()*document.getElementById("N1").value/document.getElementById("T11").value;
          await router.removeLiquidity(colAddress,usdtAddress,liq,"1","1",userAccount,"1823122819").send();
        }
        if(document.getElementById("S1").value=="wtrx") {
          liq = (await wtrx_usdt.balanceOf(userAccount).call()*document.getElementById("N1").value/document.getElementById("T21").value).toFixed(0);
          await router.removeLiquidity(wtrxAddress,usdtAddress,liq,"1","1",userAccount,"1823122819").send();
        }
      }

      getTronweb();

      /*
      async function checkApprove() {
      	  var a1;var a2;
          await vine.methods.allowance(userAccount, duelAddress).call({from:userAccount}).then(function(result) {
              a1 = result.substring(0,result.length-18);
              if (a1>=1) {
                  document.getElementById("B1").setAttribute("disabled", true);
              } else {
                  document.getElementById("B3").setAttribute("disabled", true);
                  document.getElementById("B1").removeAttribute("disabled");
              }
          });
          await eGold.methods.allowance(userAccount, duelAddress).call({from:userAccount}).then(function(result) {
              a2 = result.substring(0,result.length-18);
              if (a2>=100) {
                  document.getElementById("B2").setAttribute("disabled", true);
              }
              else {
                  document.getElementById("B3").setAttribute("disabled", true);
                  document.getElementById("B2").removeAttribute("disabled");
              }
          });
          if (a1>=100&&a2>=1) {document.getElementById("B3").removeAttribute("disabled");}
      }

      async function approveVine() {
          await vine.methods.approve(duelAddress, "10000000000000000000000000000").send({from:userAccount});
          document.getElementById("B1").setAttribute("disabled", true);
          checkApprove();
      }

      async function approveEGold() {
          await eGold.methods.approve(duelAddress, "10000000000000000000000000000").send({from:userAccount});
          document.getElementById("B2").setAttribute("disabled", true);
          checkApprove();
      }

      async function sDuel() {
      	  var summoner = document.getElementById("N1").value;
      	  var r = Math.floor(Math.random()*100);      	  
          await duel.methods.joinDuel(summoner,r).send({from:userAccount}); 
      }

      async function refresh() {
          await duel.methods.total().call({from:userAccount}).then(function(result) {
              var t = result;
              if(t==0) return;
              duel.methods.states(t).call({from:userAccount}).then(function(result) {

              	  if(t==total&&flag==result.flag) return;
                  if(result.flag) {
                      var resultsIndex=Math.floor(Math.random()*10);
                      var results=resultsArray[resultsIndex];                  	
                  	//$("#T1").append("round " + t + ": " + "Summoner#" + result.winner + " won " + "Summoner#" + result.loser + "<br/>");
                  	
                  	results=results.replace('WIN',"Summoner#" +"<span style='font-weight:bold;color:#00b74a;'>"+result.winner+"</span>");
                  	results=results.replace('LOS',"Summoner#" +"<span style='font-weight:bold;color:red;'>"+result.loser+"</span>");
                  	$("#T1").append("<div class='alert alert-warning'>"+"round " + t + ": " +results+"</div>");                   
                  } else {                   
                      //$("#T1").append("round " + t + ": " + "Summoner#" + result.winner + " is waiting!" + "<br/>");
                      var wordsIndex=Math.floor(Math.random()*10);
                      var words=wordsArray[wordsIndex];
                      $("#T1").append("<div class='alert alert-warning'>"+"round " + t + ": " + "Summoner#" + result.winner +":"+ words + "</div>");                      
                  } 
                  total = t; flag = result.flag;             
              });
          });
      }

      function sleep(delay) {
          for(var t = Date.now(); Date.now() - t <= delay;);
      }
      
      
      //alert(10);
      //getTronweb1();
      
      startApp();     
      ethereum.on('networkChanged', function (networkIDstring) {
          if(ethereum.networkVersion != desiredNetwork) {
              document.getElementById("B0").innerHTML = "Wrong network ! ! !"
          }else {             
              ethereum.enable().then(function (accounts) {
                  userAccount = accounts[0];                 
                  document.getElementById("B0").innerHTML = userAccount;
                  checkApprove();
                  showBalanceAll();
              })
          }              
      })
      ethereum.on('accountsChanged', function (accounts) {
          userAccount = accounts[0];                 
          document.getElementById("B0").innerHTML = userAccount;
          checkApprove();
          showBalanceAll();
      })
      
      var t1 = window.setInterval("refresh()",3000);
      var t1 = window.setInterval("checkApprove()",7000);
      */
