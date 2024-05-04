      var wtrxAddress = "TYSpY9igT3gebEVRxwknkAehTriUU9ms3D"; 
      var usdtAddress = "TEdeydETRec5gvdvniYTWRvbr1BQnMRebT"; 
      var colAddress = "TQWw8xjMpJJS5Ch7Po3UT8pBc2CGz8x38K"; 
      var routerAddress = "TTAS9bWxWqeZLPsDAbjD79oFRtrJkR78HT"; 
      var factoryAddress = "TPVyPk6kC4AEMrR5DAL2iuAhJKa3oFamSS"; 
      var col_usdtAddress = "THqaipBjgVLEpW2eD9GVzygSW9Un3uAgZk"; 
      var wtrx_usdtAddress = "TTEigmKutf7Zeax8WF9mHR1CWgiMCFdBf1"; 
      
      var tronWeb;
      var wtrx;
      var col;
      var usdt;
      var router;
      var factory;
      var col_usdt;
      var wtrx_usdt;
      var userAccount;

      async function getTronweb(){  
        if(window.tronWeb){
          this.tronWeb =  window.tronWeb;
          //this.walletAddress = this.tronWeb.defaultAddress.base58;
          tronWeb =  this.tronWeb;
          userAccount = tronWeb.defaultAddress.base58;
          document.getElementById("B0").innerHTML = userAccount;
          wtrx = tronWeb.contract(wtrxABI, wtrxAddress);
          usdt = tronWeb.contract(usdtABI, usdtAddress);
          col = tronWeb.contract(colABI, colAddress);
          router = tronWeb.contract(routerABI, routerAddress);
          factory = tronWeb.contract(factoryABI, factoryAddress);
          col_usdt = tronWeb.contract(pairABI, col_usdtAddress);
          wtrx_usdt = tronWeb.contract(pairABI, wtrx_usdtAddress);
          showBalanceAll(); 
      }  
        /*	
        if (window.tronLink.ready) {
          tronWeb = tronLink.tronWeb;
          userAccount = tronWeb.defaultAddress.base58;alert(userAccount);
          document.getElementById("B0").innerHTML = userAccount;
          wtrx = tronWeb.contract(wtrxABI, wtrxAddress);
          usdt = tronWeb.contract(usdtABI, usdtAddress);
          col = tronWeb.contract(colABI, colAddress);
          router = tronWeb.contract(routerABI, routerAddress);
          factory = tronWeb.contract(factoryABI, factoryAddress);
          col_usdt = tronWeb.contract(pairABI, col_usdtAddress);
          wtrx_usdt = tronWeb.contract(pairABI, wtrx_usdtAddress);
          showBalanceAll();
          
        } else {
          const res = await tronLink.request({ method: 'tron_requestAccounts' });
          if (res.code === 200) {
            tronWeb = tronLink.tronWeb;
          }
        }*/
        //return tronWeb;
      }

      async function getWTRX() {
        await wtrx.deposit().send({callValue:1000000000});
      }
      
      async function getUSDT() {
        await usdt.mint().send();
      }
      
      async function approveAll() {
        await wtrx.approve(routerAddress,"1000000000000000000000000000000000000000").send();
        await usdt.approve(routerAddress,"1000000000000000000000000000000000000000").send();
        await col.approve(routerAddress,"1000000000000000000000000000000000000000").send();
        await col_usdt.approve(routerAddress,"1000000000000000000000000000000000000000").send();
        await wtrx_usdt.approve(routerAddress,"1000000000000000000000000000000000000000").send();
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
      	var amount;
        if(tokenA=="wtrx"&&tokenB=="col") {
          amount = document.getElementById("N1").value*1e6;
          router.swapExactTokensForTokens(amount,"1",[wtrxAddress,usdtAddress,colAddress],userAccount).send();
        }
        if(tokenA=="wtrx"&&tokenB=="usdt") {
          amount = document.getElementById("N1").value*1e6;
          router.swapExactTokensForTokens(amount,"1",[wtrxAddress,usdtAddress],userAccount).send();
        }
        if(tokenA=="col"&&tokenB=="wtrx") {
          amount = document.getElementById("N1").value*1e6+"000000000000";
          router.swapExactTokensForTokens(amount,"1",[colAddress,usdtAddress,wtrxAddress],userAccount).send();
        }
        if(tokenA=="col"&&tokenB=="usdt") {
          amount = document.getElementById("N1").value*1e6+"000000000000";
          router.swapExactTokensForTokens(amount,"1",[colAddress,usdtAddress],userAccount).send();
        }
        if(tokenA=="usdt"&&tokenB=="wtrx") {
          amount = document.getElementById("N1").value*1e6;
          router.swapExactTokensForTokens(amount,"1",[usdtAddress,wtrxAddress],userAccount).send();
        }
        if(tokenA=="usdt"&&tokenB=="col") {
          amount = document.getElementById("N1").value*1e6;
          router.swapExactTokensForTokens(amount,"1",[usdtAddress,colAddress],userAccount).send();
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
          amountA = document.getElementById("N1").value*1e6+"000000000000";
          amountAMin = document.getElementById("N1").value*0.8*1e6+"000000000000";
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
          liq = (await col_usdt.balanceOf(userAccount).call()*document.getElementById("N1").value/document.getElementById("T11").value).toFixed(0);
          await router.removeLiquidity(colAddress,usdtAddress,liq,"1","1",userAccount,"1823122819").send();
        }
        if(document.getElementById("S1").value=="wtrx") {
          liq = (await wtrx_usdt.balanceOf(userAccount).call()*document.getElementById("N1").value/document.getElementById("T11").value).toFixed(0);
          await router.removeLiquidity(wtrxAddress,usdtAddress,liq,"1","1",userAccount,"1823122819").send();
        }
      }

      getTronweb();
