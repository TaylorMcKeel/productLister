const {render} = ReactDOM
const {Component} = React




    

const Nav = ({companies, products}) => {
    const prodLink = React.createElement('a', {href:`#products`}, `Products(${products.length})`) 
    const compLink = React.createElement('a', {href:`#companies`}, `Companies(${companies.length})`)
    
    return React.createElement('nav', {}, prodLink,compLink)
}

const CompanyList = ({companies}) => {
    const companylis = companies.map((company,idx) => {
        return React.createElement('li',{key: idx},company.name)
    })
    return React.createElement('ul',null,companylis)
}


const ProductList = ({products}) => {
    const productlis = products.map((product,idx) => {
        return React.createElement('li',{key: idx},`${product.name} - ${product.description}`)
    })
    return React.createElement('ul',null,productlis)
}




class App extends Component{
    constructor(){
        super()
        this.state = {
            companies: [],
            products: [],
            view: '',
        }
    }

    componentDidMount(){        
        Promise.all([
            axios.get(`https://acme-users-api-rev.herokuapp.com/api/companies`),
            axios.get(`https://acme-users-api-rev.herokuapp.com/api/products`)
        ]).then(response => {

                this.setState({
                    companies: response[0].data,
                    products: response[1].data,
                })
        })

        window.addEventListener('hashchange', () => {
            this.setState({view: window.location.hash.slice(1)})
        })
    }

    render(){
        const {companies, products, view} = this.state;
        console.log(products);

        // const viewProd = () => {
        //     this.setState({view: 'products' })
        // }
        // const viewComp = () => {
        //     this.setState({view: 'companies'} )
        // }

    
        const nav = React.createElement(Nav, {companies, products, view})

        let chosenView;
        if(view === 'companies'){
            chosenView = React.createElement(CompanyList, {companies})
        }
        if(view === 'products'){
            chosenView = React.createElement(ProductList, {products})
        }
        return React.createElement('div',null,nav,chosenView)


    }


}


const root = document.querySelector('#root')
render(React.createElement(App), root)