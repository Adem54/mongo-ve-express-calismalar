const isLogin=(req,res,next)=>{//Bu şekilde yaparsak tüm route larda bu user ve profile sayfalarında da middleware geçerli olacaktır ancak biz eğer ilk parametre olan url parametresine profileSide der ve aşağıda ki app.use("profileSide",profile) kısmını da bu şekilde değiştirirsek o zamn sadece profile sayfasında geçerli olacaktır eğer biz doğrudan app.js sayfasında middleware yazarsak
//Burda biz giriş şifresi yanlış girilmişse kontrolü yapıyoruz
const isLogin=true
if (isLogin){
    next()
}else{
    res.send("Sayfaya tekrar girmeyi deneyin")
}
}

module.exports=isLogin