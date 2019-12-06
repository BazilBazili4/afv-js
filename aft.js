function getConfig(params) {
    return {
        criteriaHeader: 'criterionName',
        criteriaValue: 'criterionValue',
        objectsHeader: 'objectName',
        objectValue: 'objectValue',
        getCriteriaHeaderClassSelector() {
            return '.' + this.criteriaHeader;
        },
        getCriteriaValueClassSelector() {
            return '.' + this.criteriaValue;
        },
        getObjectHeaderClassSelector() {
            return '.' + this.objectsHeader;
        },
        getObjectValueClassSelector() {
            return '.' + this.objectValue;
        }
    }
}

function createInput(className, inputId, row, col, defaultValue) {
    var input = document.createElement("input");
    input.setAttribute('class', className);
    input.setAttribute('id', inputId);
    input.setAttribute('data-row', row);
    input.setAttribute('data-col', col);
    input.setAttribute('value', defaultValue);

    return input;
}

function generateInputId(className, row, col) {
    var inputId = className + row + '_' + col; 
    return inputId;
}

function createVoidInput() {
    var input = document.createElement("input");
    input.setAttribute('readonly', 'readonly');
    return input;
}

function createTableCriteria(size, headersClass, valuesClass, tableName = '') {
    var table = $('<table class="table"></table>');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr>dfd</tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';1
            if (i == 0 && j == 0) {
                inputHtml = tableName;
                // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (i == 0 || j == 0) {
                var inputId = generateInputId(headersClass, i, j); 
                inputHtml = createInput(headersClass, inputId, i, j, 'Название');
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                var inputId = generateInputId(valuesClass, i, j); 
                inputHtml = createInput(valuesClass, inputId, i, j, 1);
                inputHtml.setAttribute('readonly', 'readonly');                ;
            } else {
                var inputId = generateInputId(valuesClass, i, j); 
                inputHtml = createInput(valuesClass, inputId, i, j, 0);
                // inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    }
    return table;
}

function createTableObjects(criteriaArray, size, tableName = '') {
    var table = $('<table class="table"></table>');
    var sizeWithNodes = Number(size) + 3;
    var row = $('<tr>dfd</tr>');//.text('result ' + i);
    for(var j = 0; j < sizeWithNodes; j++){
        if (j == 0) {
            inputHtml = tableName;
            // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
        } else if (j == sizeWithNodes - 2) {
            var inputId = generateInputId('idealPlus', 0, j); 
            inputHtml = createInput('idealPlus', inputId, 0, j, 'Y+');
            // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
        } else if (j == sizeWithNodes - 1) {
            var inputId = generateInputId('idealMinus', 0, j); 
            inputHtml = createInput('idealMinus', inputId, 0, j, 'Y-');

            // inputHtml = '<input type="text" ' + ' id="сriteria''+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
        } else {
            var inputId = generateInputId('objectName', 0, j); 
                inputHtml = createInput('objectName', inputId, 0, j, 'Вариант');
        }
        var element = $('<td></td>');
        element.append(inputHtml);
        row.append(element);

        
    }
    table.append(row);

    criteriaArray.forEach((criteria, i) => {
        i = i + 1;
        row = $('<tr>dfd</tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = tableName;
                // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (j == 0) {
                var inputId = generateInputId(criteria.getClassHeader(), i, j); 
                inputHtml = createInput(criteria.getClassHeader(), inputId, i, j, criteria.name);
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == 0) {element = $('<td></td>');
                var inputId = generateInputId(criteria.getClassHeader(), i, j); 
                inputHtml = createInput(criteria.getClassHeader(), inputId, i, j, 'Вариант');
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else {
                var inputId = generateInputId(criteria.className, i, j); 
                inputHtml = createInput(criteria.className, inputId, i, j, 0);
                // inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    });
    return table;
}

function createTableMatrix(criteriaArray, size, objectsArray, tableName = '') {
    var table = $('<table class="table"></table>');
    var sizeWithNodes = Number(size) + 1;
    var row = $('<tr>dfd</tr>');//.text('result ' + i);
    for(var j = 0; j < sizeWithNodes; j++){
        if (j == 0) {
            inputHtml = tableName;    
        } else {
            console.log(123);
            var inputId = generateInputId('objectName', 0, j); 
                inputHtml = createInput('objectName', inputId, 0, j, objectsArray[j - 1]);
        }
        var element = $('<td></td>');
        element.append(inputHtml);
        row.append(element);        
    }
    table.append(row);

    criteriaArray.forEach((criteria, i) => {
        i = i + 1;
        row = $('<tr>dfd</tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = tableName;
                // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (j == 0) {
                var inputId = generateInputId(criteria.getClassHeader(), i, j); 
                inputHtml = createInput(criteria.getClassHeader(), inputId, i, j, criteria.name);
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == 0) {element = $('<td></td>');
                var inputId = generateInputId(criteria.getClassHeader(), i, j); 
                inputHtml = createInput(criteria.getClassHeader(), inputId, i, j, 'Вариант');
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else {
                var inputId = generateInputId(criteria.className, i, j); 
                inputHtml = createInput(criteria.className, inputId, i, j, criteria.objectValues[j - 1]);
                // inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    });
    return table;
}

function createTableObjects(criteriaArray, size, tableName = '') {
    var table = $('<table class="table"></table>');
    var sizeWithNodes = Number(size) + 3;
    var row = $('<tr>dfd</tr>');//.text('result ' + i);
    for(var j = 0; j < sizeWithNodes; j++){
        if (j == 0) {
            inputHtml = tableName;
            // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
        } else if (j == sizeWithNodes - 2) {
            var inputId = generateInputId('idealPlus', 0, j); 
            inputHtml = createInput('idealPlus', inputId, 0, j, 'Y+');
            // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
        } else if (j == sizeWithNodes - 1) {
            var inputId = generateInputId('idealMinus', 0, j); 
            inputHtml = createInput('idealMinus', inputId, 0, j, 'Y-');
            // inputHtml = '<input type="text" ' + ' id="сriteria''+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
        } else {
            var inputId = generateInputId('objectName', 0, j); 
                inputHtml = createInput('objectName', inputId, 0, j, 'Вариант');
        }
        var element = $('<td></td>');
        element.append(inputHtml);
        row.append(element);

        
    }
    table.append(row);

    criteriaArray.forEach((criteria, i) => {
        i = i + 1;
        row = $('<tr>dfd</tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = tableName;
                // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (j == 0) {
                var inputId = generateInputId(criteria.getClassHeader(), i, j); 
                inputHtml = createInput(criteria.getClassHeader(), inputId, i, j, criteria.name);
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == 0) {element = $('<td></td>');
                var inputId = generateInputId(criteria.getClassHeader(), i, j); 
                inputHtml = createInput(criteria.getClassHeader(), inputId, i, j, 'Вариант');
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else {
                var inputId = generateInputId(criteria.className, i, j); 
                inputHtml = createInput(criteria.className, inputId, i, j, 0);
                // inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    });
    return table;
}

function getInputValue(className, row, col) {
    inputIdSelector = '#' + generateInputId(className, row, col);
    generateInputId(className, row, col);
    return $(inputIdSelector).val();
}

function getCriterionName(criterionId) {
    return getInputValue('criterionName', criterionId, 0);
}

function getCriterionValues(criterionId, criteriaCount) {
    var criterionValues = [];
    for(var i = 0; i < criteriaCount; i++){
        criterionValues[i] = Number(getInputValue('criterionValue', criterionId, i + 1));
    }
    return criterionValues;
}

function getObjectName(objectId) {
    return getInputValue('objectName', 0, objectId);
}

function getObjectValues(criterionId, criteriaCount, objectClass) {
    var criterionValues = [];
    for(var i = 0; i < criteriaCount; i++){
        criterionValues[i] = Number(getInputValue(objectClass, criterionId, i + 1));
    }
    return criterionValues;
}

function getCriteriaTotal(criteriaArray) {
    let total = 0;
    total = criteriaArray.reduce(function(sum, criterion) {
        return sum + criterion.values.reduce(function(sum, current) {
            return sum + current;
        }, 0);      
    }, 0);          
    return total;
}

function getLocalPriorityTotal(localPriorityVector) {
    let total = 0;
    total = localPriorityVector.reduce(
        (sum, value) => {
            return sum + value;
        },
        0
    );      
    return total;
}

function getGeoMean(values) {
    let mult = 1;
    for (let index = 0; index < values.length; index += 1) {
        mult *= values[index];
    }
    return Math.pow(mult, 1/values.length);
}

function getRandomConsistency(countCriteria) {
    const consistency = [0, 0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    return consistency[countCriteria];
}


function getLocalPriorityVector(criteriaArray) {
    return criteriaArray.map(
        function (criterion) {
            return getGeoMean(criterion.values);
        }
    );
}

function getLocalPriorityVectorNormalized(criteriaArray) {
    localPriorityVector = getLocalPriorityVector(criteriaArray);
    total = getLocalPriorityTotal(localPriorityVector);
    return localPriorityVector.map(
        function (value) {
            return value / total;
        }
    );
}


function setCriterion(criterionId = 1, criterionName = '', criterionValues = []) {
    return {
        id: criterionId,
        name: criterionName,
        className: translitToLatin(criterionName),
        values: criterionValues,
        objectValues: [],
        getClassSelector() {
            return '.' + this.className;
        },
        getClassHeaderSelector() {
            return '.' + this.className + 'Head';
        },
        getClassHeader() {
            return this.className + 'Head';
        },
        getYplus() {
            return this.objectValues[this.objectValues.length - 2];
        },
        getYminus() {
            return this.objectValues[this.objectValues.length - 1];
        }
    };
}

function setCriteriaArray(criteriaCount) {
    criteriaArray = [];
    for(var i = 0; i < criteriaCount; i++){
        criterionId = i + 1;
        criterionName = getCriterionName(criterionId);
        criterionValues = getCriterionValues(criterionId, criteriaCount);
        criteriaArray[i] = setCriterion(criterionId, criterionName, criterionValues);
    }
    return criteriaArray;
}

function setCriteriaArray(criteriaCount) {
    criteriaArray = [];
    for(var i = 0; i < criteriaCount; i++){
        criterionId = i + 1;
        criterionName = getCriterionName(criterionId);
        criterionValues = getCriterionValues(criterionId, criteriaCount);
        criteriaArray[i] = setCriterion(criterionId, criterionName, criterionValues);
    }
    return criteriaArray;
}

function updateCriteriaArray(criteriaArray, objectsCount) {

    var newArray = criteriaArray.map((criterion, i) => {
            criterionId = i + 1;
            criterionName = getCriterionName(criterionId);
            var criterionValues = [];
            obj = Number(objectsCount) + 2;

            for (var j = 0; j <  obj; j++) {

                criterionValues[j] = Number(getInputValue(criterion.className, criterionId, j + 1));
            }
            criterion.objectValues = criterionValues;
            return criterion;
    });
    return newArray;
}

function filterCriteria(criteriaArray) {
    return criteriaArray.filter(
        (criterion, index) => {
            let yDiff = Math.abs(criterion.getYplus() - criterion.getYminus());
            return yDiff > 1;
        }
    );
}

function setRelativeObjectValues(criteriaArray) {
    return criteriaArray.map(
        (criterion, index) => {
            criterion.objectValues = criterion.objectValues.map(
                (value, index) => {
                    if (index < criterion.objectValues.length -2) {
                        return (criterion.getYplus() - value) / (criterion.getYplus() - criterion.getYminus());
                    } else {
                        return value;
                    }
                }
            );
            return criterion;
        }
    );
}

function getObjectsMatrix(criteriaArray) {
    let result = [];
    for (let j = 0; j < criteriaArray[0].objectValues.length - 2; j++) {
        objectArray = [];
        for (let index = 0; index < criteriaArray.length; index++) {
            objectArray[index] = criteriaArray[index].objectValues[j];       
        }
        result[j] = objectArray;
    }
    return result;
}

function getResultMatrix(objectsMatrix, criteriaArray) {
    let powerArray = [1, 2, 4];
    let localPriorityVector = getLocalPriorityVectorNormalized(criteriaArray);
    result = [];
    powerArray.forEach(
        (power, index) => {
            objectsMatrixResult = [];
            for (let i = 0; i < objectsMatrix.length; i++) {
                let sum = 0
                for (let j = 0; j < localPriorityVector.length; j++) {
                    let diff = (1 - objectsMatrix[i][j])
                    let p = Math.pow(diff, power);
                    sum = sum + p;
                    // console.log(objectsMatrixResult);
                }
                objectsMatrixResult[i] = Math.pow(sum, 1/power); 
            }
            result[index] = objectsMatrixResult;
        }
    );
    return result;
}

function setObject(objectId = 1, objectName = '', objectValues = []) {
    return {
        id: objectId,
        name: objectName,
        className: translitToLatin(objectName),
        values: objectValues,
        getClassSelector() {
            return '.' + this.className;
        }
    };
}

function setObjectsArray(objectsCount, objectClass) {
    criteriaArray = [];
    for(var i = 0; i < objectsCount; i++){
        objectId = i + 1;
        objectName = getObjectName(objectId);
        objectValues = getObjectValues(objectId, objectsCount, objectClass);
        criteriaArray[i] = setObject(objectId, objectName, objectValues);
    }
    return criteriaArray;
}

function setObjectsNamesArray(objectsCount) {
    namesArray = [];
    for(var i = 0; i < objectsCount; i++){
        objectId = i + 1;
        objectName = getObjectName(objectId);
        console.log(objectName);
        namesArray[i] = objectName;
    }
    return namesArray;
}

function reflectInputValue(input) {
    var reflectionClass = $(input).attr('class');
    var reflectionCol = $(input).data('row');
    var reflectionRow = $(input).data('col');
    var reflectionId = '#' + reflectionClass + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val($(input).val());
}

function reflectObjectName(input, className) {
    var reflectionClass = className;
    var reflectionCol = $(input).data('col');
    var reflectionRow = $(input).data('row');
    var reflectionId = '#' + reflectionClass + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val($(input).val());
}

function reflectCriterionValue(input) {
    var reflectionClass = $(input).attr('class');
    var reflectionCol = $(input).data('row');
    var reflectionRow = $(input).data('col');
    var reflectionId = '#' + reflectionClass + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val(1/$(input).val());
}

function showObjectControls() {
    $('#objects-controll').attr("style","display: block");
}

function showResultControls() {
    $('#result-controll').attr("style","display: block");
}

function showMatrixControls() {
    $('#matrix-controll').attr("style","display: block");
}


function translitToLatin (str) {
    
    var ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    }, n_str = [];
    
    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
    
    for ( var i = 0; i < str.length; ++i ) {
       n_str.push(
              ru[ str[i] ]
           || ru[ str[i].toLowerCase() ] == undefined && str[i]
           || ru[ str[i].toLowerCase() ].replace(/^(.)/, function ( match ) { return match.toUpperCase() })
       );
    }
    
    return n_str.join('');
}

$(document).ready(function(){
    var criteriaArray = [];
    var matrix = [];

    var config = getConfig();
    var her = $("h2");
    her.css("color", "red"); 
    var field = $('#content');
    var table = $('#table');
    var tableObjects = $('#tables');
    var tableMatrix = $('#tablesMatrix');
    var butCreateTable = $("#createTable");
    var butCreateObjects = $("#createTableObjects");
    var butCreateMatrix = $("#matrix");

    var result = $("#result");
    butCreateTable.on('click', function () {
        var countNodes = $("#countNodes").val();
        table.html(createTableCriteria(countNodes, config.criteriaHeader, config.criteriaValue));
        showObjectControls();
        field.on('change', config.getCriteriaHeaderClassSelector(), function (e) {
            reflectInputValue(e.target);
        });
        field.on('change', config.getCriteriaValueClassSelector(), function (e) {
            reflectCriterionValue(e.target);
        });
    });    
    butCreateObjects.on('click', function () {
        var countObjects = $("#countObjects").val();

        criteriaArray = setCriteriaArray($("#countNodes").val());

        tableObjects.append(createTableObjects(criteriaArray, countObjects));

        showMatrixControls();
    });
    butCreateMatrix.on('click', function () {
        var countObjects = $("#countObjects").val();

        criteriaArray = updateCriteriaArray(criteriaArray, countObjects);
        console.log(criteriaArray);
        criteriaArray = filterCriteria(criteriaArray);
        console.log(criteriaArray);
        criteriaArray = setRelativeObjectValues(criteriaArray);
        objectsNames = setObjectsNamesArray(countObjects);
        console.log(objectsNames);
        console.log(criteriaArray);
        tableMatrix.html(createTableMatrix(criteriaArray, countObjects, objectsNames));
        matrix = getObjectsMatrix(criteriaArray);
        console.log(matrix);
        matrix = getResultMatrix(matrix, criteriaArray);
        console.log(matrix);

    });    
});
