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
        this.languages = getAllElements(obj.languages);
        this.currencies = getAllElements(obj.currencies);
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

            fillSimpleData('Language', self.languages, $languageRow);

            fillSimpleData('Currency', self.currencies, $currencyRow);

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
            var string = "";
            string = arr.join(', ');

            return string;
        }

    }

    function searchCountry() {
        var url = "https://restcountries.eu/rest/v2/name/";
        var countryName = $countryName.val();

        $.ajax({
                method: "GET",
                url: url + countryName
            })
            .done(function (jqXHR) {
                countryList(jqXHR)
            })
            .fail(function (jqXHR) {
                clear();
                var $error;

                if (!countryName) {
                    $error = $('<h1 id="error">').text("Field can't be empty");
                    $('input').after($error)

                } else {
                    $error = $('<h1 id="error">').text("Country doesn't exist");
                    $('input').after($error)
                }
            });

        function countryList(jqXHR) {
            clear();

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

    $button.click(searchCountry);

}(jQuery));
