


// immutable 
const buttons = document.querySelectorAll("button");
// given function
let store = Immutable.Map({
    user: Immutable.Map({ name: "Aditya" }),
    apod: 'Curiosity',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    images: []
})

// add our markup to the page
const root = document.getElementById('root')

// given function
const updateStore = (store, newState) => {
    store = store.merge(newState)
    render(root, store)
}
// given function 
const render = async (root, state) => {
    root.innerHTML = higherOrder(state, imgSelector, App, root)
}

//Higher order function
// accepts a function as an argument and returns a function.
const higherOrder =(state, imgSelector,App) =>{
    // calling 
    return callingFunction(state, imgSelector, App); 
}
// activate and add images to the dom
// higher order function return a function
const callingFunction =(state,imgSelector, App) =>{
    return `<div> ${App(state)}</div>
    <header><div>${imgSelector(store)}<div></header>`
    // `
            
}
// for selct image from site and date and add to the Dom

//High-order function -- returns a function that returns a value 
const imgSelector = (store) => {
    let add = []
    // const { images } = store.toJS()
    
    store.get('images').slice(0, 10).forEach((ele, index) => {
        if(index === 0){
            add += `<h2> ${ele.rover.name} Rover Images</h2>`
        }
        add += `<figure class="photos">
                    <img src="${ele.img_src}" alt="latest Rover Image">
                    <br>
                    <figcaption>
                        <div>Rover: ${ele.rover.name} </div>
                        <div>status: ${ele.rover.status}</div>
                        <div> id: ${ele.id}</div>
                        <div>Earth date: ${ele.earth_date}</div>
                        <div>days on Mars: ${ele.sol}</div>
                        <div>launch date: ${ele.rover.launch_date}</div>
                        <div> landing  date: ${ele.rover.landing_date}</div>

                    </figcaption>
                    
                   
                </figure>
                <br>`
    })
    return add
}

// Given Function
const App = (state) => {
    const { rovers, apod } = state.toJS()

    return `
        <header></header>
        <main>
            ${Greeting(store.get('user').get('name'))}
            <section>
                <h3>Put things on the page</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day.
                </p>
                
            </section>
        </main>
        
    `
}


// const getFun = async(currentId) =>{
//     updateStore
// }

// listening for load event because page should load before any JS is called
// added some function
window.addEventListener('load', async () => {
    buttons.forEach((ele) => {
        
        ele.addEventListener('click', (event)=>{
            const currentId = event.target.id;
            
            // getDataOfRover(currentId);
            getImageOfTheDay(currentId);
            updateStore(store, { apod: currentId });
            
        })
    })
    // await getDataOfRover('Curiosity');
    await getImageOfTheDay('Curiosity');
    updateStore(store,{apod: 'Curiosity'})
    
    
})

// Given function
// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h2>Welcome To Mars Dashbord, ${name}...</h2>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}
// ------------------------------------------------------  API CALLS

// Example API call
// given api call according to that change
const updateimg=(state, newState) =>{
    store = state.merge(newState)
    render(root, store)

}
const getImageOfTheDay = (data) => {
    fetch('http://localhost:3000/images', {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({data})
    })
    .then(res => res.json())
    .then(ele => updateimg(store, {images:ele }))
    .catch(err => console.error("error!!! Please check getImageOfTheDay :", err))

}
