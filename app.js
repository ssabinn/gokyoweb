import "./lottie_light.js"

let homeAnimation=null;
let homeAnimationMobile=null;

let initialScroll=false;
let initialScrollMobile=false;

const RenderPage = (data) => {

    let header = headerElement(data)

    let homePage = homeElement({...data.home,...data.header})

    let whatWeDoPage = whatWeDoElement(data.whatWeDo)

    let whoWeArePage = whoWeAreElement({...data,...data.whoWeAre})

    let footerPage = footerElement({...data,...data.footer})

    let productsPage = productsElement(data.products)

    let dropdownPage = dropdownElement(data.products)

    let root = document.getElementById('root')
    root.appendChild(header);
    root.appendChild(dropdownPage)
    root.appendChild(homePage);
    root.appendChild(whatWeDoPage);
    root.appendChild(productsPage)
    root.appendChild(whoWeArePage);
    root.appendChild(footerPage);

    document.querySelector('#dropdown-menu-button').addEventListener('click', showDropdown)

    window.onscroll = (e)=>scrollHandler(e,data)

    homeAnimation = lottie.loadAnimation({
        container: document.getElementById('home-animation'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/main_animation.json', // the path to the animation json
    });

    homeAnimationMobile = lottie.loadAnimation({
        container: document.getElementById('home-animation-mobile'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/main_animation_mobile.json' // the path to the animation json
    });


}

const headerElement = ({header, products=[]}) => {
     let element = document.createElement("div")
     element.setAttribute("class", "header")
    element.innerHTML=`
        <div class="container">
        <a href="./">
        <img src=${header.logoUrl} class="logo" />
        </a>
        <div class="header-menu">
        ${
         [...products, ...header.menu.items].map((item)=> `
         <a 
         href="${ item.link || (item.links || {}).view || '#'}"
         class="header-menu-item pointer no-underline">
         
         <img src=${item.iconUrl} class="header-menu-item-icon" />
        ${item.name}
        ${item.new? `<div class="header-menu-item-label">NEW</div>`:''}
    </a>
         ` ).join('')
        }
        </div>
        <div class="header-dropdown">
        <div id="dropdown-menu-button" class="header-menu-item pointer" style="display: flex; align-items: flex-start;"
        
        >
         <img src=${header.productsIconUrl} class="header-menu-item-icon" />
        Products
        &nbsp;
         <img src=${'assets/arrow_down.svg'} class="header-menu-item-icon" />
    </div>
        
</div>
        
         
    </div>
    `

    return element
}

const dropdownElement = (products=[]) => {
    let element  = document.createElement('div')
    element.setAttribute('id','dropdown-menu')
    element.innerHTML=`
    <div class="container">
    ${
        products.map((product)=>`<a href="${product.links.view || '#'}" class="dropdown-item no-underline">
<div>
<img src="${product.iconLargeUrl}"/>
<div>
${product.description}
</div>
</div>
<object type="image/svg+xml" data="assets/arrow_right.svg" style="margin-left: 20px;"></object>
</a>

`).join('')
        }
    </div>
    `;

    return element
}

const homeElement = ({title,subtitle,imageUrl,menu})=>{

let element = document.createElement('div')
    element.innerHTML = `

    <div class="home">
    <div class="container">
    <div class="title home-title">
        ${title}
    </div>
    <br/>
    <div class="description flex-wrap">

    ${subtitle.map((item,index)=>`<span>
    ${item.toUpperCase()}
    ${(index<subtitle.length-1)?`<span class="dot">&nbsp;•&nbsp;</span>`:''}
    </span>`).join('')}

    </div>
    <div class="home-buttons">
    ${
        menu.items.map((item)=> appButton(`<img src="${item.iconUrl}" /> &nbsp;&nbsp; ${item.name}`,item.link,false,false,true))
            
            }
    <br/>
    ${
        appButton('KNOW MORE','',false,true,true)
            }

    </div>
    <br/>

    </div>
    </div>
    `
    return element
}

const whatWeDoElement = ({title,subtitle})=>{
    let element = document.createElement('div')
    element.innerHTML = `
    <div class="what-we-do" id="what-we-do"><div class="container">
    <div class="home-image" id="home-animation"></div>
    <div class="home-image-mobile" id="home-animation-mobile"></div>
    <div class="title" id="rndtitle">
    ${title}
    </div>
    <br/>
    <div class="description" id="rnddesc">
    ${subtitle}
    </div>
    </div>
    </div>
    `
    return element
}

const whoWeAreElement = ({title,subtitle,services})=>{
    let element = document.createElement('div')
    element.innerHTML = `
    <div class="who-we-are">
    <div class="container">

    <div id="whotitle" class="title">
        ${title}
    </div>
    <div id="whodesc" class="description">
         ${subtitle}
    </div>
    <div class="services" id="services">
    ${
      services.map((service)=>`<div class="service" id="${service.name}">
    <img src=${service.iconUrl} />
    <div>${service.name}</div>
    </div>
    `).join('')
            }
    </div>
    </div>
    </div>
    `
    return element
}

const footerElement = ({title, email, address, copyright, products=[]}) =>{
    let element = document.createElement('div')
    element.innerHTML = `
<div class="footer" id="Contact Us">
    <div class="container" id="footer">
    <div class="footer-top">
    <div class="footer-menu footer-left inverse">
        <div class="title inverse footer-title" style="display:none;">
            A
        </div>
        <div class="footer-menu-item">
            <div class="footer-item-label">Links</div>
            ${
            products.map((product)=>`<a href="${product.links.view}" class="footer-item-menu bold no-underline inverse">    
            ${product.name}
            </a>
        `).join('')
                }
        </div>
    </div>
    

    <div class="footer-menu footer-right inverse">
        <div class="title inverse footer-title" style="text-align: start;">
            ${title}
        </div>
        <div class="footer-menu-item" style="flex:2;">
            <div class="footer-item-label"> ${email.label} </div>
            <a class="footer-item-text underline pointer inverse" href="mailto:${email.text}"> ${email.text} </a>
        </div>
        <div class="footer-menu-item">
            <div class="footer-item-label"> ${address.label} </div>
            <div class="footer-item-text inverse" > ${address.text} </div>
            <a class="footer-item-label inverse no-underline" href="${address.link.url}" target="_blank">${address.link.text}</a>
        </div>
    </div>
    </div>

<div class="copyright">${copyright}</div>

</div>
</div>
    `

    return element
}


const productsElement = (products=[]) => {
    let element = document.createElement('div')
    element.innerHTML = `
    <div class="products container">
    ${
        products.map((product,index)=>`<div class="product" id="${product.name}">
        <div class="product-detail">
        <div class="product-number">
        0${index+1}
</div>

<div id="${product.name}-detail" class="product-title">
    <div class="product-product">PRODUCT</div>
    <div class="title no-margin", style="text-align: start; max-width: 450px;">
    ${product.fullName}
    </div>

    <div class="description no-margin" style="max-width: 388px;text-align: start;">
    ${product.description}
    </div>

    <div class="product-buttons-top">
    ${
                appButton('View product',product.links.view,true)
                }
    ${
                appButton('request demo',product.links.demo)
                }
    </div>
</div>
</div>
    <img
    id="${product.name}-image"
    src="${product.imageUrl}"
    class="product-image"
    />
    <div class="product-buttons-bottom" >
${
            appButton('View product',product.links.view,true,true)
            }
${
            appButton('request demo',product.links.demo)
            }
</div>
</div>`).join('')
        }
</div>
    `

    return element
}


export function showDropdown () {

    console.log("showing dropdown")
    if(!window.dropdown){
        document.getElementById("dropdown-menu")
            .style.height='auto';
        window.dropdown=true;
    }
    else{
        document.getElementById("dropdown-menu")
            .style.height='0px'
        window.dropdown=false;
    }
}


const appButton = (text, link, hasArrow,reverse,large) => `<a class="app-button ${large?'large-button':''} ${reverse?'reverse-button':''} "
href="${link || '#'}"
target=${link?"_blank":"_self"}
>
${large?text:text.toUpperCase()}

${hasArrow?`&nbsp;&nbsp;<object type="image/svg+xml" data="assets/${reverse?'arrow_right':'arrow_right_white'}.svg"></object>`:''}
</a>`


const scrollHandler = (e,{products=[],services=[]}) => {

    let scrollY = window.scrollY



 //    TODO: previous animation (scroll triggered but not scroll driven)
 //    if(
 //        scrollY>=40 && !initialScroll
 // ){
 //
 //        homeAnimation.play();
 //        homeAnimation.setSpeed(3);
 //        initialScroll=true;
 //    }


    //TODO: new scroll driven animation

    let scrollMultiplier = 0.9; //ratio of animation speed with respect to pixels scrolled (lower means slower animation)
    let scrollOffset = 40; //animation starts only after this amount of scroll
    let animationFrame =
        parseInt(scrollY*scrollMultiplier-scrollOffset)>homeAnimation.getDuration(true)
            ?
            homeAnimation.getDuration(true)
            :
            parseInt(scrollY*scrollMultiplier-scrollOffset);
    homeAnimation.goToAndStop(animationFrame>0?animationFrame:0,true)


    let mobileAnimationElement = document.getElementById('home-animation-mobile');

    //TODO: previous mobile scroll animation
    // if(scrollY>=(mobileAnimationElement.offsetTop - mobileAnimationElement.offsetHeight/2) && !initialScrollMobile){
    //     homeAnimationMobile.play();
    //     initialScrollMobile=true;
    // }

    //TODO: new mobile scroll animation

    let mobileScrollMultiplier = 0.7;
    let mobileScrollOffset = 100;
    let mobileAnimationFrame =
        parseInt(scrollY*mobileScrollMultiplier-mobileScrollOffset)>homeAnimationMobile.getDuration(true)
            ?
            homeAnimationMobile.getDuration(true)
            :
            parseInt(scrollY*mobileScrollMultiplier-mobileScrollOffset);
    homeAnimationMobile.goToAndStop(mobileAnimationFrame>0?mobileAnimationFrame:0,true)

    slideInTransition({
        id:'rndtitle',
        axis:'Y',
        offset: 450
    })
    slideInTransition({
        id:'rnddesc',
        axis:'Y',
        offset: 450
    })

    //TODO: product scroll animation - right>left

    products.forEach((product)=>{

        if(window.matchMedia("(max-width: 1024px)")){
            slideInTransition({
                id:product.name+'-image',
                axis:'X',
                offset: 200,
                opacityMultiplier: 4
            })    
        }else{
            slideInTransition({
                id:product.name+'-image',
                axis:'X',
                offset:-200,
                opacityMultiplier: 4
            })
        }
        
        slideInTransition({
            id:product.name+'-detail',
            axis:'y',
            offset: 300,
            opacityMultiplier: 2
        })
    })


    //TODO: services scroll animation - right>left
    services.forEach((service, index)=>{
        slideInTransition({
            id:service.name,
            axis:'Y',
            offset: 500 - index*50
        })
    })

    slideInTransition({
        id:'whotitle',
        axis:'Y',
        offset: 400
    })
    slideInTransition({
        id:'whodesc',
        axis:'Y',
        offset: 400
    })

    //TODO: footer scroll animation - bottom>top
    slideInTransition({
        id:'footer',
        axis:'Y',
        offset: -100,
        opacityMultiplier: 50
    })
    

    //TODO: what-we-do scroll animation - bottom>top

    // element = document.getElementById('what-we-do')
    // centerOffset = element.offsetTop - element.offsetHeight/2;
    // element.style.transform = `translateY(${ (centerOffset - scrollY)>0?(centerOffset - scrollY):0}px)`
    // element.style.opacity = scrollY>centerOffset?1:Math.pow(scrollY/centerOffset,4);



}

const slideInTransition = ({
        id,
        axis = 'X',
        negative=false,
        offset = 0,
        opacityMultiplier = 0
    }
) => {

    let scrollY = window.scrollY
    let element = document.getElementById(id)
    let centerOffset = element.offsetTop - element.offsetHeight/2;

    element.style.transform = `translate${axis.toUpperCase()}(${negative?'-':''}${ (centerOffset - scrollY)>offset?(centerOffset - scrollY)-offset:0}px)`
    element.style.opacity = (scrollY>centerOffset)?'1':Math.pow(scrollY/centerOffset,opacityMultiplier).toString();

}


export {RenderPage}