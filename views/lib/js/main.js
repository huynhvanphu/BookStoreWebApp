$(function(){
    var owl = $('.owl-carousel');
    var width = $(window).width();
    if (width < 420) {
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true
        });
    } else {
        owl.owlCarousel({
            items: 5,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true
        });
    }
    
    // $('.play').on('click', function () {
    //     owl.trigger('play.owl.autoplay', [1000])
    // })
    // $('.stop').on('click', function () {
    //     owl.trigger('stop.owl.autoplay')
    // })

    $('#form-comments-edit').hide();
    $('#form-comments-add').on('submit', function(e){
        e.preventDefault();
        const ProductId = $(this).data('product');
        const comment = $('#input-comments-add').val();
        $.ajax({
            url: '/comments',
            type: 'POST',
            data: {
                comment: comment,
                ProductId: ProductId
            },
            success: function(){
                location.reload(true);
            }
        })
    })
    $('#input-comments-add-cancel').on('click', function(){
        $('#input-comments-add').val('');
    })
    $('#input-comments-edit-cancel').on('click', function () {
        $('#input-comments-edit').val('');
        $('#form-comments-edit').hide();
        $('#form-comments-add').show();
    })
    $('.btn-edit').on('click', function () {
        $('#form-comments-add').hide();
        $('#form-comments-edit').show();
        const id = $(this).data('id');
        const comment = $(this).data('comment');
        $('#input-comments-id').val(id);
        $('#input-comments-edit').val(comment);
    })
    $('#form-comments-edit').on('submit', function(e){
        e.preventDefault();
        const id = $('#input-comments-id').val();
        const comment = $('#input-comments-edit').val();
        $.ajax({
            url: '/comments/' + id,
            type: 'PUT',
            data: {
                comment : comment
            },
            success : function() {
                location.reload(true);
            }
        })
    })
    $('.btn-delete').on('click', function() {
        const id = $(this).data('id');
        if (confirm('Are you sure to delete this?')) {
            $.ajax({
                url: '/comments/' + id,
                type: 'DELETE',
                success: function() {
                    location.reload(true);
                }
            })
        }
    })
    $('.add-to-cart').on('click', function(){
        const ProductId = $(this).data('product');
        $.ajax({
            url: '/cart',
            type: 'POST',
            data: {ProductId},
            success: function(){
                // alert('Product has been added to cart');
                location.reload(true);
            }
        })
    })
    $('.form-cart-item-update').on('submit', function(e){
        e.preventDefault();
        const ProductId = $(this).data('id');
        const quantity = $('#quantity' + ProductId).val();
        $.ajax({
            url: '/cart',
            type: 'PUT',
            data: {
                ProductId,
                quantity
            },
            success: function() {
                location.reload();
            }
        })
    })
    $('.btn-cart-remove').on('click', function(){
        if (confirm('Are you sure to delete this?')){
            const ProductId = $(this).data('id');
            $.ajax({
                url: '/cart',
                type: 'DELETE',
                data: {ProductId},
                success: function() {
                    location.reload();
                }
            })
        }
    })
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true
    });
    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000])
    })
    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay')
    })
})

