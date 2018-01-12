$(function ($) {

    var $button = $('#search');
    var $countryName = $('#country-name');
    var $countriesList = $('#countries');

    function CountryInfor(obj) {
        var self = this;
        this.name = obj.name;
        this.capital = obj.capital;
        this.population = obj.population;
        this.area = obj.area;
        this.languages = obj.languages;
        this.currencies = obj.currencies;
        this.flag = obj.flag;
        this.$element = create();

        function create() {

            var $table = $('<table class="table table-bordered">');
            var $tableBody = $('<tbody>');
            var $tableCountry = $table.append($tableBody);
            var $headerRow = $('<tr>');
            var $capitalRow = $('<tr>');
            var $populationRow = $('<tr>');
            var $areaRow = $('<tr>');
            var $languageRow = $('<tr>');
            var $currencyRow = $('<tr>');

            fillHeaderData([self.flag, self.name])
            fillSimpleData('Capital', self.capital, $capitalRow);
            fillSimpleData('Population', self.population, $populationRow)
            fillSimpleData('Area', self.area + " sq km", $areaRow);

            fillSimpleData('Language', self.languages[0].name, $languageRow);

            fillSimpleData('Currency', self.currencies[0].name, $currencyRow);

            $tableCountry.append($headerRow)
                .append($capitalRow)
                .append($populationRow)
                .append($areaRow)
                .append($languageRow)
                .append($currencyRow);

            var $countryCard = $('.jumbotron').after($tableCountry);

            return $countryCard;


            function fillSimpleData(description, property, $elementRow) {
                var $elementColumnDesc = $('<td>');
                var $elementColumnName = $('<td>');
                var $elementDescription = $('<h3>').text(description);
                var $elementName = $('<h3>').text(property);
                $elementColumnDesc
                    .append($elementDescription);
                $elementColumnName.append($elementName);

                $elementRow.append($elementColumnDesc)
                    .append($elementColumnName);
            }

            function fillHeaderData(property) {
                var $flagColumn = $('<td>');
                var $nameColumn = $('<td>');
                var $flag = $('<img>').addClass('flag').attr('src', property[0]);
                $flagColumn.append($flag);
                var $countryName = $('<h3 class="countryName">').text(property[1]);
                $nameColumn.append($countryName);
                $headerRow.append($flagColumn)
                    .append($nameColumn);
            }
        }

        function getAllElements(elements) {
            var arr = []
            for (var elem in elements) {
                var element = elements[elem];
                for (var prop in element) {
                    var oneElement = element[prop];
                    arr.push(oneElement);
                }
            }
            return arr.join(', ');
        }

    }

    function searchCountry(countryName) {
        var url = "https://restcountries.eu/rest/v2/name/";
        clear();
        
        $.ajax({
                method: "GET",
                url: url + countryName
            })
            .done(function (jqXHR) {
                countryList(jqXHR)
            })
            .fail(function (jqXHR) {
                var $error;

                if (!countryName) {
                    errorInfo("Field can't be empty");
                } else {
                    errorInfo("Country doesn't exist");
                }
            
            function errorInfo(info) {
                    $error = $('<h1 id="error">').text(info);
                    $('input').after($error)
            }
            
            });

        function countryList(jqXHR) {
            jqXHR.forEach(function (element) {
                var countryCard = new CountryInfor(element);
                countryCard.$element;
            })

        }

        function clear() {
            $('#error').remove();
            $('table').remove();
        }
    }

    $button.click(function() {
        searchCountry($countryName.val())
        alert(countryNameToURL)
    });

}(jQuery));
