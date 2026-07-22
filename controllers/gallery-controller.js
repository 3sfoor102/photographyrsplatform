

const showGallery = async (req, res) =>{
   res.render('gallery.ejs') 
}

const GalleryRandomImages = async (req, res)=>{
    let imagesArray = ['https://drive.google.com/thumbnail?id=1Uu4mId8dOenewYL8IKoj2jgc45LxJzVn&sz=s4000'] 
    res.render('gallery.ejs', {images: imagesArray})
}

module.exports = {
showGallery, GalleryRandomImages,
};
