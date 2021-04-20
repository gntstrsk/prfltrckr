<script>
    import gsap from 'gsap';
    import { onMount } from 'svelte';
    
    /* Splash Animation Logic */

	onMount(() => {
		
		let dirRightSlow = gsap.utils.toArray('.line.toRight.slow');
		let dirRightMedium = gsap.utils.toArray('.line.toRight.medium');
		let dirRightFast = gsap.utils.toArray('.line.toRight.fast');

		let dirLeftSlow = gsap.utils.toArray('.line.toLeft.slow');
		let dirLeftMedium = gsap.utils.toArray('.line.toLeft.medium');
		let dirLeftFast = gsap.utils.toArray('.line.toLeft.fast');

		gsap.to(dirRightSlow, { x:'+300vw', duration: 20, delay: 0.8, stagger: 0.3, repeat: -1, ease: "slow(0.3, 0.9)" }); //.to(dirRightSlow[0], {x:'-=100vw', duration:0});
		//dirRightSlow.push( dirRightSlow.shift() );
		gsap.to(dirRightMedium, { x:'+300vw', duration: 10, delay: 0.4, stagger: 0.5, repeat: -1, ease: "slow(0.5, 0.8)" }); //.to(dirRightMedium[0], {x:'-=100vw', duration:0});
		//dirRightMedium.push( dirRightMedium.shift() );
		gsap.to(dirRightFast, { x:'+300vw', duration: 4, stagger: 0.7, repeat: -1, ease: "slow(0.8, 0.8)" }); //.to(dirRightFast[0], {x:'-=100vw', duration:0});
		//dirRightFast.push( dirRightFast.shift() );

		gsap.to(dirLeftSlow, { x:'-300vw', duration: 20, delay: 0.6, stagger: 0.3, repeat: -1, ease: "slow(0.3, 0.9)" }); //.to(dirLeftSlow[0], {x:'+=100vw', duration:0});
		//dirLeftSlow.push( dirLeftSlow.shift() );
		gsap.to(dirLeftMedium, { x:'-300vw', duration: 10, delay: 0.2, stagger: 0.5, repeat: -1, ease: "slow(0.5, 0.8)" }); //.to(dirLeftMedium[0], {x:'+=100vw', duration:0});
		//dirLeftMedium.push( dirLeftMedium.shift() );
		gsap.to(dirLeftFast, { x:'-300vw', duration: 4, stagger: 0.7, repeat: -1, ease: "slow(0.8, 0.8)" }); //.to(dirLeftFast[0], {x:'+=100vw', duration:0});

	});
</script>

<div class="index tab">
    <div class="index presence">
        <span class="logo">*</span>
        <span class="title">prfltrckr</span>
    </div>
</div>

<div class="splash animation">
	<div class="splash lines">
		<div class="splash top">
			<div class="top long normal line toRight slow"></div><br>
			<div class="top short thin line toLeft fast"></div><br>
			<div class="top short thin line toLeft medium"></div>
			<div class="top semistretched thin line toRight fast"></div>
			<div class="top long thick line toLeft slow"></div>
		</div>
		<div class="splash mid">
			<div class="semistretched normal line toRight medium"></div>
		</div>
		<div class="splash bottom">
			<div class="bottom semistretched thin line toRight fast"></div>
			<div class="bottom short thick line toLeft slow"></div><br>
			<div class="bottom short fat line toRight medium"></div>
		</div>
	</div>
</div>

<style>
    .tab{
		position:fixed;
		margin:auto;
		z-index:40;
		top: 0px;
	}
    .presence{
        color: #7453FF;
        width: 100vw;
        height: 100vh;
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
        text-align:center;
        line-height: 250%;
    }
    .logo{
        font-family: 'PT Mono', monospace;
        font-size:140px;
    }
    .title{
        font-family: 'Courier Prime', monospace;
        font-size:50px;
        letter-spacing: 5px;
    }


	:global(body){
		background-color: #202020;
		overflow:hidden;
	}
	.splash{
		display:flex;
		flex-direction:column;
		justify-content:space-around;
	}
	.splash.animation{
		position:relative;
		right: 100vw;
		width: 300vw;
		z-index: 10;
		justify-content:center;
	}
	.splash.lines{
		height: 100vh;
	}
	.line{
		background: #7453FF;
	}


	/* line position*/

	.splash.top{
		
	}
	.splash.mid{
		
	}
	.splash.bottom{
		
	}
	.line.toRight{
		align-self:flex-start;
	}
	.line.toLeft{
		align-self:flex-end;
	}


	/* line height */ 

	.thin.line{
		height: 2px;
	}

	.normal.line{
		height: 8px;
	}

	.thick.line{
		height: 18px;
	}

	.fat.line{
		height: 55px;
	}


	/* line width */

	.short.line{
		width: 30vw;
	}

	.semistretched.line{
		width: 60vw;
	}

	.long.line{
		width: 90vw;
	}


</style>