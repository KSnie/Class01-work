// L = [1,2,3,4,5,6,7,8,9,10]
// B = [5,6,7,8,9,10,1,2,3,4]
 
// console.log(L.sort((a,b) => a-b).concat(B.sort((a,b) => a-b)).reverse())

L = [
    {id:6511234,name:'Jack',salary:10000},
    {id:6511235,name:'Mike',salary:15000},
    {id:6511236,name:'Nancy',salary:20000},
    {id:6511237,name:'Alice',salary:30000},
]

L = L.map((x) => {return {...x , bonus: x.salary *0.2}})

L.sort((a,b) => a.name.localeCompare(b.name))

console.table(L)