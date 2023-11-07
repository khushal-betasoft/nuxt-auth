export default function ({ store, redirect }) {
    console.log(store)
    if (store.state.isLogin) {
        return true
    }
    else {
        // this.$swal({
        //     icon: "success",
        //     title: "Already logged in.",
        //     toast: false,
        // }).then(()=>{
        //     redirect('/loginPage')
        // })
        redirect('/login')

    }
}