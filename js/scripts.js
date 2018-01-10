$(function ($) {

    var $button = $('#search');
    var $countryName = $('#country-name');
    var $countriesList = $('#countries');

    function searchCountry() {
        var url = "https://restcountries.eu/rest/v2/name/";
        var countryName = $countryName.val();

        $.ajax({
                method: "GET",
                url: url + countryName
            })
            .done(function (jqXHR) {
                countryList(jqXHR)
            });

        function countryList(jqXHR) {
            $countriesList.empty();

            jqXHR.forEach(function (element) {
                $countriesList.append('<li>' + element.name + '</li>');
            })


        }
    }

    $button.click(searchCountry);

}(jQuery));
