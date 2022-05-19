window.myData = function () {
    return {
        activeImage:'image',
        actifTab:'accueil',
        openHome(){ this.actifTab = 'accueil'},
        showHome(){ return this.actifTab === 'accueil'},
        openProducts(){ this.actifTab = 'products'},
        showProducts(){ return this.actifTab === 'products'},
        openMaster(){ this.actifTab = 'manage'},
        showMaster(){ return this.actifTab === 'manage'},
        adminAction:'dash',
        openDash(){ this.adminAction = 'dash'},
        showDash(){ return this.adminAction === 'dash'},
        newProduct(){ this.adminAction = 'newProduct' },
        addProduct(){ return this.adminAction === 'newProduct' },
        openProductsList(){ this.adminAction = 'productsList'},
        showProductsList(){ return this.adminAction === 'productsList'},
        newCategory(){ this.adminAction = 'addCateg' },
        addCategory(){ return this.adminAction === 'addCateg' },
        newBrand(){ this.adminAction = 'addBrand' },
        addBrand(){ return this.adminAction === 'addBrand' },
        newTag(){ this.adminAction = 'addTag' },
        addTag(){ return this.adminAction === 'addTag' },
        filterElements:false,
        openNav:false,
        openNavigation(){ 
            this.filterElements = true
            this.openNav = true
        },
        showNavigation(){ return this.openNav === true },
        closeNavigation(){ this.openNav =false },
        dropFilter:false,
        openDropFilter(){ this.dropFilter = true },
        showDropFilter(){ return this.dropFilter === true },
        closeDropFilter(){ this.dropFilter = false },
        viewBtn:false,
        viewButtons(){ this.viewBtn = true},
        showButtons(){ return this.viewBtn === true},
        hidButtons(){ this.viewBtn = false},
        atTop:true,
        LastButton:false,
        scrollAction(){
            this.atTop = (window.pageYOffset > 40) ? false : true
        },
        fixedNav(){ return this.atTop === false},
        manageFilters:false,
        openFilters(){ this.manageFilters = true },
        showFilters(){ return this.manageFilters === true },
        closeFilters(){ this.manageFilters = false },
        selected:"",
        selectBrand:false,
        openSelectBrand(){ this.selectBrand = true },
        showSelectBrand(){ return this.selectBrand === true },
        closeSelectBrand(){ this.selectBrand = false },
        selctetTag:false,
        openSelectTag(){ this.selectTag = true },
        showSelectTag(){ return this.selectTag === true },
        closeSelectTag(){ this.selectTag = false },
        selectCategory:false,
        openSelectCategory(){ this.selectCategory = true },
        showSelectCategory(){ return this.selectCategory === true },
        closeSelectCategory(){ this.selectCategory = false },
        all:"allProds",
        viewAllProducts(){ this.all = 'allProds'},
        showAllProducts(){ return this.all === 'allProds'},
        viewTopsProducts(){ this.all = 'tops'},
        showTopsProducts(){ return this.all === 'tops'},
        categos:[],
        async  viewCategories(){
            var  response = await fetch('http://localhost/API_PROJECT/api/controlers/productsdata.php?categoryList')
            var datas = await response.json()
            this.categos = datas.categories
        },
        brands:[],
        async viewBrands(){
            var response = await fetch(`http://localhost/API_PROJECT/api/controlers/productsdata.php?brandList`)
            var data = await response.json();
            this.brands = data.brands
        },
        tags:[],
        async viewTags(){
            var response = await fetch(`http://localhost/API_PROJECT/api/controlers/productsdata.php?tagsList`)
            var data = await response.json();
            this.tags = data.tags
        },
        products:[],
        async viewProducts(){
            var  reponse = await fetch('http://localhost/API_PROJECT/api/controlers/productsdata.php?products')
            var data = await reponse.json()
            this.products = data.products
            console.log(this.products)
        },
        async viewProductsByCategory(id){
            var  response = await fetch(`http://localhost/API_PROJECT/api/controlers/productsdata.php?categories=${id}&brand=&tags=`)
            var result = await response.json()
            this.products = result.products
        },
        checkCateg:[],
        checkBrand:[],
        checkTag:[],
        async filterProducts(ct,br,tg){
            var filter = await fetch(`http://localhost/API_PROJECT/api/controlers/productsdata.php?categories=${ct}&brand=${br}&tags=${tg}`)
            var datas = await filter.json()
            this.products = datas.products
            console.log(this.products)
        },
        // isSelected:false,
        myInit: async function(){
            await this.viewCategories()
            await this.viewBrands()
            await this.viewTags()
            await this.viewProducts()
        },
        activeFilter:false,
        numberOfProducts:3,
        numberOfItems:4,
        pageNumber:0,
        total:"",
        get filteredProducts(){
            const start = this.pageNumber * this.numberOfItems
            const end = start + this.numberOfItems
            this.total = this.products.length
            return this.products.slice(start, end)
        },
        get allProducts(){
            const start = this.pageNumber * this.numberOfProducts
            const end = start + this.numberOfProducts
            this.total = this.products.length
            return this.products.slice(start, end)
        },
        hideNextButton:false,
        hidePreviousButton:true,
        nextView(){
            this.hideNextButton = true
            this.hidePreviousButton = false
            return this.numberOfProducts = this.products.length
        },
        previousView(){
            this.hideNextButton = false
            this.hidePreviousButton = true
            return this.numberOfProducts = 3
        },
        nextPage(){
            return this.pageNumber++
        },
        previous(){
            return this.pageNumber--
        },
        // array to display all pages(for loop to display  numbers)
        pages(){
            return Array.from({
                length:Math.ceil(this.total/this.numberOfItems)
            })
        },
        pageCount(){
            return Math.ceil(this.total/this.numberOfItems)
        },
        // last button
        viewPage(index){
            return this.pageNumber = index
        },
        startResults() {
            return this.pageNumber * this.numberOfItems + 1;
          },

          //Return the end range of the paginated results
          endResults() {
            let resultsOnPage = (this.pageNumber + 1) * this.numberOfItems;
            if (resultsOnPage <= this.total) {
              return resultsOnPage;
            }

            return this.total;
          },
        categorySearch:"",
        get filtredCategos(){
            if (this.categorySearch === "") {
                return this.categos
            }
            return this.categos.filter((catego) => {
                return catego.libelle
                .toLowerCase()
                .includes(this.categorySearch.toLowerCase())
            })
        },
        brandSearch:"",
        get filtredBrands(){
            if (this.brandSearch === "") {
                return this.brands
            }
            return this.brands.filter((brand) => {
                return brand.brand_name
                .toLowerCase()
                .includes(this.brandSearch.toLowerCase())
            })
        },
        tagValue:"",
        tagSearch:[],
        searchTag:"",
        
        get filtredTags(){
            if (this.searchTag === "") {
                return this.tags
            }
            return this.tags.filter((tag) => {
                return tag.tag_name
                .toLowerCase()
                .includes(this.searchTag.toLowerCase())
            })
        },
        // openInput:false,
        getSelectedTags(tgId){
            this.tagValue = tgId
            console.log("select tag id is:"+this.tagValue)
           
            this.tagSearch.push(this.searchTag)
            // console.log(this.tagSearch)
        },
        // showInput(){
        //     return this.openInfos === true
        // },
        removeTag(value){
            this.tagSearch = this.tagSearch.filter(tg => value !== tg)
        },
        product:[],
        openInfos:false,
        viewProductInfos(id_p){ 
            this.openInfos = true 
            fetch(`http://localhost/API_PROJECT/api/controlers/productsdata?products&product_id=${id_p}`)
                .then(data=>data.json())
                .then(result=>{
                    this.product = result.product
                    console.log(this.product)
                })
                // console.log(this.product)
        },
        openCart:false,
        cartMessage:"",
        async openCartModal(product_id){ 
            this.openCart = true
            var data = await fetch(`http://localhost/API_PROJECT/api/controlers/panier.php?product_id=${product_id}`)
            var response = await data.json()
            this.cartMessage = response
            console.log(this.cartMessage) 
        },
        viewCartModal(){ return this.openCart === true },
        closeCartModal(){ this.openCart = false },
        productInfos(){ return this.openInfos === true },
        closeInfosModal(){ this.openInfos = false },
        categoryId:"",
        brandId:"",
        seeVal(){
            console.log("valeur active des categories:" +this.categoryId)
            console.log("valeur active des marques:" +this.brandId)
        },
        image:"",
        title:"",
        price:"",
        description:"",
        category:"",
        addMsg:false,
        addMessage:"",
        postProduct: async function(){
           this.addMsg = true
           var postdata = await fetch(`http://localhost/API_PROJECT/api/admin/addproduct.php?title=${this.title} &image=${this.image}&description=${this.description}&categ_id=${this.categ_id}&brand_id=${this.brand_id}`, {
            method:"POST",
            "content-type":"multipart/form-data",
        })
            var result = await postdata.json()
            this.addMessage = result
            console.log(result)
        },
        viewAddMessage(){ return this.addMsg === true},
        closeAddMessage(){ this.addMsg = false},
        // value:null,
        // openDeleteModal:false,
        // viewDeleteModal(valeur){ 
        //     this.openDeleteModal = true
        //     this.value = valeur
        // },
        // showDeleteModal(){ return this.openDeleteModal === true },
        // closeDeleteModal(){ this.openDeleteModal = false },
        // showMessage:false,
        // message:"",
        deleteProduct: async function(id){
            console.log(id)
            // this.showMessage = true
            // console.log(product_id)
            var deletedata = await fetch(`http://localhost/API_PROJECT/api/admin/products/${id}`, {
                method:"DELETE",
            })
             var reponse = await deletedata.json()
             console.log(reponse)
            //  this.message = reponse 
            //  console.log(this.message)
        },
        // viewMessage(){ return this.showMessage === true}
    }
}