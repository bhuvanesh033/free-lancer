console.log("hello")
const callback =(data)=>{
    console.log(data)
    return false
}

const extactor = (a)=>{
    
    return (a/0)
}

extactor(10)


Promise.resolve(extactor(10)).then((data)=>{
    console.log('data',data)
}).catch((error)=>{
    console.log('error',error)
})