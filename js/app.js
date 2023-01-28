window.addEventListener('load', function () {
    const labs = [
            {'value': 'lab-1.html', 'text': 'Лабораторна робота №1'},
            {'value': 'lab-2.html', 'text': 'Лабораторна робота №2'}
        ],
        sectionsNodeList = document.querySelectorAll('main section[data-option-value][data-option-text]'),
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
     * Build document header
     */
    (function () {
        const header = document.createElement('header'),
            container = document.createElement('div'),
            row = document.createElement('div'),
            col = document.createElement('div'),
            h1 = document.createElement('h1'),
            p = document.createElement('p');

        container.classList.add('container-md', 'pt-3');
        row.classList.add('row');
        col.classList.add('col-lg-8', 'col-md-10', 'col-sm-12', 'col-12', 'offset-lg-2', 'offset-md-1', 'offset-sm-0');
        h1.classList.add('font-monospace', 'text-uppercase', 'text-center', 'fs-4');
        p.classList.add('font-monospace', 'text-uppercase', 'text-center', 'fs-5');

        h1.appendChild(
            document.createTextNode(
                'Звіт з лабораторних робіт з дисципліни "інтернет-технології та проектування WEB-застосувань"'
            )
        );

        p.appendChild(document.createTextNode('Студент групи ЗПІ-зп21 Флорчук Назарій Петрович'));

        col.appendChild(h1);
        col.appendChild(p);
        row.appendChild(col);
        container.appendChild(row);
        header.appendChild(container);

        document.querySelector('body').prepend(header);
    })();

    /**
     * Build document navigation
     */
    (function () {
        const nav = document.createElement('nav'),
            container = document.createElement('div'),
            row = document.createElement('row'),
            getColElement = function (id, label) {
                const col = document.createElement('div'),
                    select = document.createElement('select');

                col.classList.add('col-md-6', 'col-12', 'pt-3');
                select.classList.add('form-select');

                select.setAttribute('id', id);
                select.setAttribute('aria-label', label);

                col.appendChild(select);

                return col;
            };

        container.classList.add('container-md');
        row.classList.add('row');

        row.appendChild(getColElement('labs', 'List of laboratory works'));
        row.appendChild(getColElement('sections', 'Sections of laboratory work'));

        container.appendChild(row);
        nav.appendChild(container);

        document.querySelector('header').after(nav);
    })();

    const labsElement = document.getElementById('labs'),
        sectionsElement = document.getElementById('sections');

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