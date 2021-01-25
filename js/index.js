const $main = $('#main').select(function() {})

let data = {}
let page = 1
let endpoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000'
let api_key = 'SObGqwOUo2Pim9HRrLLTEH4g7Ckeh3r7Hkh8AmiT'


// Header
$('.nav-link').on('click', function(e) {
    console.log(e)
    let link = e.currentTarget.dataset.link
    switch (link) {
        case 'home':
            home()
            break;
        case 'apod':
            endpoint = 'https://api.nasa.gov/planetary/apod?'
            $.ajax({
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                url: endpoint + 'api_key=' + api_key,
                success: function(response) {
                    console.log(response)
                    fetchApodData(response)
                },
                error: function() {
                    console.log('something went wrong')
                },
            })
            break;
        case 'mars':
            endpoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&'
            $.ajax({
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                url: endpoint + 'api_key=' + api_key,
                success: function(response) {
                    console.log(response)
                    fetchMarsData(response)
                },
                error: function() {
                    console.log('something went wrong')
                },
            })
            break;

        default:
            break;
    }

})


// Gallery
function fetchMarsData(data) {
    if (data.photos) {
        $('#main').html('')
        $('#main').html(`<h1 class="text-center text-uppercase mt-5 fw-light">Pictures taken from Mars</h1>`)
        $('#main').append(`<div class="container mt-5">
                <div class="row" id="gallery"></div>
         </div>
        `)
        data.photos.forEach((element) => {
            $('#gallery').append(`
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="card h-100 ">
                    <img src="${element.img_src}" alt="" class="card-img-top">
                <div class="card-body">
                        <h5 class="card-title text-center">${data.photos[0].camera.name}</h5>
                        <p class="card-text fw-light">${data.photos[0].camera.full_name}</p>
                    </div>
                <div class="card-footer text-muted">
                    <p class="text-italic">${data.photos[0].earth_date}</p>
                    <i>${data.photos[0].rover.name}</i>
                </div>
            </div>
    `)
        })
    }
}

// APOD
function fetchApodData(data) {
    if (data.media_type === 'image') {}
    $('#main').html('')
    $('#main').html(`<h1 class="text-center mt-5 text-uppercase fw-light ">Astronomy Picture of the Day</h1>`)
    $('#main').append(`
        <div class="card mx-auto w-75 mt-5">
            <img src="${data.url}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title text-center">${data.title}</h5>
                    <p class="card-text fw-light">${data.explanation}</p>
                </div>
                <div class="card-footer text-muted">
                    <p class="text-italic">${data.copyright}</p>
                    <i>${data.date}</i>
                </div>
        </div>
    `)
}

// Home
function home() {
    $('#main').html(`
        <div class="container text-center mt-5">
            <h1>ACTIVITY 3</h1>
            <p class="fw-light">This application is for Activity purpose only. This aims to illustrate the used and function of NASA's API</p>
            <p class="fw-light">Submitted by</p>
            <p class="fw-bold">Patricia Mae C. Espenida</p>
            <p class="fw-bold">BSIT 3A</p>
        </div>
    `)
}

// Search
$('#searchForm').on('submit', function(e) {
    e.preventDefault()
    let search = $('#search').val()
    endpoint = 'https://images-api.nasa.gov/search?q=' + search
    $.ajax({
        type: 'GET',
        url: endpoint,
        success: function(response) {
            console.log(response)
            $('#main').html(`<div class="container mt-5">
                    <div class="row" id="results">

                    </div>
                </div>
          `)
            response.collection.items.forEach(item => {
                if (item.data[0].media_type === 'image') {
                    $('#results').append(`
                    <div class="col-12 col-md-6 col-lg-4 mb-3">
                        <div class="card h-100 ">
                            <img src="${item.links[0].href}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title text-center">${item.data[0].title}</h5>
                                <p class="card-text text-truncate fw-light" style="max-width: 200px;" 
                                data-bs-toggle="tooltip" data-bs-placement="left" title="${item.data[0].description}">
                                ${item.data[0].description}
                                </p>
                            </div>
                            <div class="card-footer text-muted fw-light fs-6">
                                <p class="text-italic">${item.data[0].date_created}</p>
                            </div>
                        </div>
                    </div>
                    `)
                }
            })
        },
        error: function() {
            console.log('something went wrong')
        },
    })
})