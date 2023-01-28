window.addEventListener('load', function () {
    const labsElement = document.getElementById('labs'),
        sectionsElement = document.getElementById('sections'),
        sectionsNodeList = document.querySelectorAll('main section[data-option-value][data-option-text]'),
        labs = [
            {'value': 'lab-1.html', 'text': 'Лабораторна робота №1'},
            {'value': 'lab-2.html', 'text': 'Лабораторна робота №2'}
        ],
        sections = (function () {
            let result = [];

            sectionsNodeList.forEach(function (sectionNode) {
                let section = {};

                section.value = sectionNode.getAttribute('data-option-value');
                section.text = sectionNode.getAttribute('data-option-text');

                if (sectionNode.hasAttribute('data-optgroup-label')) {
                    section.optgroup = sectionNode.getAttribute('data-optgroup-label');
                }

                result.push(section);
            });

            return result;
        })(),
        currentLabValue = window.location.pathname.split('/').slice(-1)[0];

    /**
     * Populating labs select tag with options
     */
    labs.forEach(function (lab) {
        let optionElement = document.createElement('option');

        optionElement.setAttribute('value', lab.value);

        if (currentLabValue === lab.value) {
            optionElement.selected = true;
        }

        optionElement.appendChild(document.createTextNode(lab.text));

        labsElement.appendChild(optionElement);
    });

    /**
     * Populating sections select tag with options
     */
    sections.forEach(function (section) {
        let optionElement = document.createElement('option');

        optionElement.setAttribute('value', section.value);

        optionElement.appendChild(document.createTextNode(section.text));

        if (typeof (section.optgroup) !== 'undefined') {
            let optGroupsNodeList =
                sectionsElement.querySelectorAll('optgroup[label="' + section.optgroup + '"]');

            if (optGroupsNodeList.length === 0) {
                let optGroupElement = document.createElement('optgroup');

                optGroupElement.setAttribute('label', section.optgroup);

                sectionsElement.appendChild(optGroupElement);

                optGroupElement.appendChild(optionElement);
            } else {
                optGroupsNodeList.item(0).appendChild(optionElement);
            }
        } else {
            sectionsElement.appendChild(optionElement);
        }
    });

    /**
     * Adding event listener for lab select tag
     */
    labsElement.addEventListener("change", function (event) {
        let link = document.createElement('a');

        link.setAttribute('href', event.target.value);

        link.click();
    });

    /**
     * Adding event listener for sections select tag
     */
    sectionsElement.addEventListener("change", function (event) {
        let value = event.target.value;

        sectionsNodeList.forEach(function (sectionNode) {
            // Hiding all sections
            sectionNode.classList.remove('d-block');

            if (sectionNode.getAttribute('data-option-value') === value) {
                // Showing selected section
                sectionNode.classList.add('d-block');
            }
        })
    });

    /**
     * Showing first selected section
     */
    (function () {
        let sectionOptionsNodeList = sectionsElement.querySelectorAll('option');

        if (sectionOptionsNodeList.length > 0) {
            let value = sectionOptionsNodeList.item(0).value;

            sectionsNodeList.forEach(function (sectionNode) {
                if (sectionNode.getAttribute('data-option-value') === value) {
                    sectionNode.classList.add('d-block');
                }
            });
        }
    })();

    /**
     * On page opening, always set the focus on sections select tag
     */
    sectionsElement.focus();
});