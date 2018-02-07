describe('Test plugins', function () {
    getBox().style.width = 'auto';
    describe('Copy format plugin', function () {
        it('Should copy fontWeight from element and paste it in new selection', function () {
            getBox().style.width = 'auto';
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('text <strong>test</strong> post');
            editor.selection.setCursorIn(editor.editor.querySelector('strong'));
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat').length).to.equal(1);
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(0);

            simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-copyformat'))

            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(1);

            var sel = editor.editorWindow.getSelection(),
                range = editor.editorDocument.createRange();

            range.selectNode(editor.editor.lastChild);
            sel.removeAllRanges();
            sel.addRange(range);

            simulateEvent('mouseup', 0, editor.editor);

            expect(editor.getEditorValue().replace('700', 'bold')).to.equal('text <strong>test</strong><span style="font-weight: bold;"> post</span>');
        });
        it('Should copy fontSize from element and paste it in new selection', function () {
            getBox().style.width = 'auto';
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('text <span style="font-size: 11px;">test</span> post');
            editor.selection.setCursorIn(editor.editor.querySelector('span'));

            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat').length).to.equal(1);
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(0);

            simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-copyformat'))

            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(1);

            var sel = editor.editorWindow.getSelection(),
                range = editor.editorDocument.createRange();

            range.selectNode(editor.editor.lastChild);
            sel.removeAllRanges();
            sel.addRange(range);

            simulateEvent('mouseup', 0, editor.editor);

            expect(editor.getEditorValue()).to.equal('text <span style="font-size: 11px;">test</span><span style="font-size: 11px;"> post</span>');
        });
        it('Should copy fontSize and color from element and paste it in new selection', function () {
            getBox().style.width = 'auto';
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('text <span style="font-size: 11px;color: rgb(255, 0, 0);">test</span> post');
            editor.selection.setCursorIn(editor.editor.querySelector('span'));
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat').length).to.equal(1);
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(0);

            simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-copyformat'))

            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(1);

            var sel = editor.editorWindow.getSelection(),
                range = editor.editorDocument.createRange();

            range.selectNode(editor.editor.lastChild);
            sel.removeAllRanges();
            sel.addRange(range);

            simulateEvent('mouseup', 0, editor.editor);

            expect(sortAtrtibutes(editor.getEditorValue())).to.equal('text <span style="color:rgb(255, 0, 0);font-size:11px">test</span><span style="color:rgb(255, 0, 0);font-size:11px"> post</span>');
        });
        it('Should toggle active state after double click', function () {
            getBox().style.width = 'auto';
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('text <span style="font-size: 11px;color: rgb(255, 0, 0);">test</span> post');
            editor.selection.setCursorIn(editor.editor.querySelector('span'));
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat').length).to.equal(1);
            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(0);

            simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-copyformat'))

            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(1);

            simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-copyformat'))

            expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(0);

            var sel = editor.editorWindow.getSelection(),
                range = editor.editorDocument.createRange();

            range.selectNode(editor.editor.lastChild);
            sel.removeAllRanges();
            sel.addRange(range);

            simulateEvent('mouseup', 0, editor.editor);

            expect(sortAtrtibutes(editor.getEditorValue())).to.equal('text <span style="color:rgb(255, 0, 0);font-size:11px">test</span> post');
        });

        describe('Set cursor inside em[style=background] > strong elements', function () {
            it('Should copy fontWeight from strong element, copy italic and background  style from em  and paste it in new selection', function () {
                getBox().style.width = 'auto';
                var editor = new Jodit(appendTestArea());
                editor.setEditorValue('text <em style="background-color: #ff0000"><strong>test</strong></em> post');

                editor.selection.setCursorIn(editor.editor.querySelector('strong'));
                expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat').length).to.equal(1);
                expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(0);

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-copyformat'))

                expect(editor.container.querySelectorAll('.jodit_toolbar_btn-copyformat.jodit_active').length).to.equal(1);

                var sel = editor.editorWindow.getSelection(),
                    range = editor.editorDocument.createRange();

                range.selectNode(editor.editor.lastChild);
                sel.removeAllRanges();
                sel.addRange(range);

                simulateEvent('mouseup', 0, editor.editor);

                expect(
                    sortAtrtibutes(
                        editor.getEditorValue()
                           .replace(/700/g, 'bold')
                           .replace(/rgb\(255, 0, 0\)/g, '#ff0000')
                    )
                ).to.equal('text <em style="background-color:#ff0000"><strong>test</strong></em><span style="background-color:#ff0000;font-style:italic;font-weight:bold"> post</span>');
            });
        });
    });
    describe('Add new Line plugin', function () {
        it('Should add new line element in container', function () {
            var editor = new Jodit(appendTestArea());
            expect(editor.container.querySelectorAll('.jodit-add-new-line').length).to.equal(1);
        });
        it('Should show .jodit-add-new-line after user move mouse under Table,Ifrmae or IMG ', function () {
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('<table>' +
                '<tr><td>1</td></tr>' +
                '<tr><td>2</td></tr>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>4</td></tr>' +
                '</table>');

            window.scrollTo(0, 100000000) // elementFromPoint works only with visible part of view

            simulateEvent('mousemove', 0, editor.editor, function (e) {
                var pos = editor.helper.offset(editor.editor.firstChild, editor);
                e.pageX = pos.left + 5;
                e.pageY = pos.top + 5;
                // createPoint(e.pageX, e.pageY)
            });

            var newline = editor.container.querySelector('.jodit-add-new-line');

            expect(newline).not.to.equal(null);
            expect(newline.style.display).to.equal('block');
        });
        it('Should add new paragraph after user clicked on newline ', function () {
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('<table><tbody>' +
                '<tr><td>2</td></tr>' +
                '<tr><td>2</td></tr>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>4</td></tr>' +
                '</tbody></table>');

            window.scrollTo(0, 100000000) // elementFromPoint works only with visible part of view

            simulateEvent('mousemove', 0, editor.editor, function (data) {
                var pos = editor.helper.offset(editor.editor.firstChild, editor);
                data.pageX = pos.left + 5;
                data.pageY = pos.top + 5;
            });

            var newline = editor.container.querySelector('.jodit-add-new-line');

            expect(newline).not.to.equal(null);
            expect(newline.style.display).to.equal('block');


            simulateEvent('mousedown', 0, newline.querySelector('span'));
            expect(editor.getElementValue()).to.equal('<p></p><table><tbody>' +
                '<tr><td>2</td></tr>' +
                '<tr><td>2</td></tr>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>4</td></tr>' +
                '</tbody></table>');
        });
        it('Should add new paragraph after user clicked on newline below table', function () {
            var editor = new Jodit(appendTestArea());
            editor.setEditorValue('<table><tbody>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>2</td></tr>' +
                '</tbody></table>');


            window.scrollTo(0, 100000000); // elementFromPoint works only with visible part of view

            simulateEvent('mousemove', 0, editor.editor, function (data) {
                var pos = editor.helper.offset(editor.editor.firstChild, editor);
                data.pageX = pos.left + 5;
                data.pageY = pos.top + (pos.height - 5);
            });

            var newline = editor.container.querySelector('.jodit-add-new-line');

            expect(newline).not.to.equal(null);
            expect(newline.style.display).to.equal('block');


            simulateEvent('mousedown', 0, newline.querySelector('span'));
            expect(editor.getElementValue()).to.equal('<table><tbody>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>2</td></tr>' +
                '</tbody></table><p></p>');
        });
        it('Should add new paragraph after user clicked on newline below table in IFRAME mode', function () {
            var editor = new Jodit(appendTestArea(), {
                ifarme: true
            });
            editor.setEditorValue('<table><tbody>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>2</td></tr>' +
                '</tbody></table>');


            window.scrollTo(0, 100000000); // elementFromPoint works only with visible part of view

            simulateEvent('mousemove', 0, editor.editor, function (data) {
                var pos = editor.helper.offset(editor.editor.firstChild, editor);
                data.pageX = pos.left + 5;
                data.pageY = pos.top + (pos.height - 5);
            });

            var newline = editor.container.querySelector('.jodit-add-new-line');

            expect(newline).not.to.equal(null);
            expect(newline.style.display).to.equal('block');


            simulateEvent('mousedown', 0, newline.querySelector('span'));
            expect(editor.getElementValue()).to.equal('<table><tbody>' +
                '<tr><td>3</td></tr>' +
                '<tr><td>2</td></tr>' +
                '</tbody></table><p></p>');
        });
        describe('Insert line on top of IMG element that was inside P element', function () {
            it('Should insert new P before parent P element', function () {
                var editor = new Jodit(appendTestArea());
                editor.setEditorValue('<p><img src="https://xdsoft.net/jodit/images/artio.jpg" style="width: 100px; height: 100px;" alt=""></p>');

                window.scrollTo(0, 100000000) // elementFromPoint works only with visible part of view

                var img = editor.editor.querySelector('img');
                expect(null).to.be.not.equal(img);

                simulateEvent('mousemove', 0, editor.editor, function (e) {
                    var pos = editor.helper.offset(img, editor);
                    e.pageX = pos.left + 5;
                    e.pageY = pos.top + 5;
                });

                var newline = editor.container.querySelector('.jodit-add-new-line');

                expect(null).to.be.not.equal(newline);
                expect(newline.style.display).to.equal('block');
                simulateEvent('mousedown', 0, newline.querySelector('span'));

                editor.selection.insertHTML('stop');

                expect('<p>stop</p><p><img alt="" src="https://xdsoft.net/jodit/images/artio.jpg" style="height:100px;width:100px"></p>').to.be.equal(sortAtrtibutes(editor.getEditorValue()));
            });
        });
    });

    describe('Edit image tests', function () {
        describe('Image editor', function () {
            describe('Crop mode', function () {
                describe('Enable ratio', function () {
                    it('Should deny crop image without ratio', function (done) {
                        var area = appendTestArea();
                        var editor = new Jodit(area, {
                            observer: {
                                timeout: 0
                            },
                            uploader: {
                                url: 'https://xdsoft.net/jodit/connector/index.php?action=upload'
                            },
                            filebrowser: {
                                ajax: {
                                    url: 'https://xdsoft.net/jodit/connector/index.php'
                                }
                            },
                            disablePlugins: 'mobile'
                        });
                        editor.setEditorValue('<img src="https://xdsoft.net/jodit/files/th.jpg">');

                        simulateEvent('dblclick', 0, editor.editor.querySelector('img'));

                        var dialog = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active');

                        expect(dialog.style.display).to.be.not.equal('none');
                        expect(dialog.querySelectorAll('a.jodit_use_image_editor').length).to.equal(1);

                        editor.events.on('afterImageEditor', function () {
                            var imageEditor = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active .jodit_image_editor');
                            expect(imageEditor).to.be.not.equal(null);

                            expect(imageEditor.querySelectorAll('[data-area=crop]').length).to.equal(1);
                            expect(imageEditor.querySelectorAll('[data-area=crop].active').length).to.equal(0);

                            simulateEvent('click', 0, imageEditor.querySelector('[data-area=crop] > div'));

                            expect(imageEditor.querySelectorAll('[data-area=crop].active').length).to.equal(1);

                            var cropper = imageEditor.querySelector('.jodit_image_editor_croper');

                            expect(cropper).not.to.equal(null);

                            var oldRatio = cropper.offsetWidth / cropper.offsetHeight;
                            simulateEvent('mousedown', 0, cropper.querySelector('.jodit_bottomright'), function (e) {
                                var pos = editor.helper.offset(cropper, editor);
                                e.clientX = pos.left + pos.width;
                                e.clientY = pos.top + pos.height;
                            });

                            simulateEvent('mousemove', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(cropper, editor);
                                e.clientX = pos.left + pos.width - 50;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            simulateEvent('mouseup', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(cropper, editor);
                                e.clientX = pos.left + pos.width - 50;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            expect(Math.abs(cropper.offsetWidth / cropper.offsetHeight - oldRatio) < 0.005).to.be.equal(true);

                            done();
                        });

                        simulateEvent('mousedown', 0, dialog.querySelector('a.jodit_use_image_editor'));
                    }).timeout(7000);
                });
                describe('Disable ratio', function () {
                    it('Should allow crop image without ratio', function (done) {
                        var area = appendTestArea();

                        var editor = new Jodit(area, {
                            observer: {
                                timeout: 0
                            },
                            uploader: {
                                url: 'https://xdsoft.net/jodit/connector/index.php?action=upload'
                            },
                            filebrowser: {
                                ajax: {
                                    url: 'https://xdsoft.net/jodit/connector/index.php'
                                }
                            },
                        });
                        editor.setEditorValue('<img src="https://xdsoft.net/jodit/files/th.jpg">');

                        simulateEvent('dblclick', 0, editor.editor.querySelector('img'));

                        var dialog = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active');

                        expect(dialog.style.display).to.be.not.equal('none');
                        expect(dialog.querySelectorAll('a.jodit_use_image_editor').length).to.equal(1);

                        editor.events.on('afterImageEditor', function () {
                            var imageEditor = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active .jodit_image_editor');
                            expect(imageEditor).to.be.not.equal(null);

                            expect(imageEditor.querySelectorAll('[data-area=crop]').length).to.equal(1);
                            expect(imageEditor.querySelectorAll('[data-area=crop].active').length).to.equal(0);

                            simulateEvent('click', 0, imageEditor.querySelector('[data-area=crop] > div'));

                            expect(imageEditor.querySelectorAll('[data-area=crop].active').length).to.equal(1);

                            var cropper = imageEditor.querySelector('.jodit_image_editor_croper');

                            expect(cropper).not.to.equal(null);

                            var oldRatio = cropper.offsetWidth / cropper.offsetHeight;

                            var disableRatioBtn = imageEditor.querySelector('[data-area=crop].active').querySelector('.jodit_btn_radio_group button:last-child');

                            expect(disableRatioBtn).not.to.equal(null);
                            simulateEvent('click', 0, disableRatioBtn);

                            simulateEvent('mousedown', 0, cropper.querySelector('.jodit_bottomright'), function (e) {
                                var pos = editor.helper.offset(cropper, editor);
                                e.clientX = pos.left + pos.width;
                                e.clientY = pos.top + pos.height;
                            });
                            simulateEvent('mousemove', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(cropper, editor);
                                e.clientX = pos.left + pos.width - 50;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            simulateEvent('mouseup', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(cropper, editor);
                                e.clientX = pos.left + pos.width - 50;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            expect(Math.abs(cropper.offsetWidth / cropper.offsetHeight - oldRatio) > 1).to.be.equal(true);

                            done();
                        });

                        simulateEvent('mousedown', 0, dialog.querySelector('a.jodit_use_image_editor'));
                    }).timeout(7000);
                });
            });
            describe('Resize mode', function () {
                describe('Enable ratio', function () {
                    it('Should deny resize image without ratio', function (done) {
                        var area = appendTestArea();
                        var editor = new Jodit(area, {
                            observer: {
                                timeout: 0
                            },
                            uploader: {
                                url: 'https://xdsoft.net/jodit/connector/index.php?action=upload'
                            },
                            filebrowser: {
                                ajax: {
                                    url: 'https://xdsoft.net/jodit/connector/index.php'
                                }
                            },
                        });
                        editor.setEditorValue('<img src="https://xdsoft.net/jodit/files/th.jpg">');

                        simulateEvent('dblclick', 0, editor.editor.querySelector('img'));

                        var dialog = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active');

                        expect(dialog.style.display).to.be.not.equal('none');
                        expect(dialog.querySelectorAll('a.jodit_use_image_editor').length).to.equal(1);

                        editor.events.on('afterImageEditor', function () {
                            var imageEditor = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active .jodit_image_editor');
                            expect(imageEditor).to.be.not.equal(null);

                            expect(imageEditor.querySelectorAll('[data-area=resize]').length).to.equal(1);
                            expect(imageEditor.querySelectorAll('[data-area=resize].active').length).to.equal(1); // default mode

                            simulateEvent('click', 0, imageEditor.querySelector('[data-area=resize] > div'));

                            expect(imageEditor.querySelectorAll('[data-area=resize].active').length).to.equal(1);

                            var resizer = imageEditor.querySelector('.jodit_image_editor_resizer');

                            expect(resizer).not.to.equal(null);

                            var oldRatio = resizer.offsetWidth / resizer.offsetHeight;

                            simulateEvent('mousedown', 0, resizer.querySelector('.jodit_bottomright'), function (e) {
                                var pos = editor.helper.offset(resizer, editor);
                                e.clientX = pos.left + pos.width;
                                e.clientY = pos.top + pos.height;
                            });

                            simulateEvent('mousemove', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(resizer, editor);
                                e.clientX = pos.left + pos.width - 250;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            simulateEvent('mouseup', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(resizer, editor);
                                e.clientX = pos.left + pos.width - 250;
                                e.clientY = pos.top + pos.height - 150;
                            });


                            expect(Math.abs(resizer.offsetWidth / resizer.offsetHeight - oldRatio) < 0.005).to.be.equal(true);

                            done();
                        });

                        simulateEvent('mousedown', 0, dialog.querySelector('a.jodit_use_image_editor'));
                    }).timeout(7000);
                });
                describe('Disable ratio', function () {
                    it('Should allow resize image without ratio', function (done) {
                        var area = appendTestArea();
                        var editor = new Jodit(area, {
                            observer: {
                                timeout: 0
                            },
                            uploader: {
                                url: 'https://xdsoft.net/jodit/connector/index.php?action=upload'
                            },
                            filebrowser: {
                                ajax: {
                                    url: 'https://xdsoft.net/jodit/connector/index.php'
                                }
                            },
                        });
                        editor.setEditorValue('<img src="https://xdsoft.net/jodit/files/th.jpg">');

                        simulateEvent('dblclick', 0, editor.editor.querySelector('img'));

                        var dialog = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active');

                        expect(dialog.style.display).to.be.not.equal('none');
                        expect(dialog.querySelectorAll('a.jodit_use_image_editor').length).to.equal(1);

                        editor.events.on('afterImageEditor', function () {
                            var imageEditor = editor.ownerDocument.querySelector('[data-editor_id=' + area.id + '].jodit.jodit_dialog_box.active .jodit_image_editor');
                            expect(imageEditor).to.be.not.equal(null);

                            expect(imageEditor.querySelectorAll('[data-area=resize]').length).to.equal(1);
                            expect(imageEditor.querySelectorAll('[data-area=resize].active').length).to.equal(1); // default mode

                            simulateEvent('click', 0, imageEditor.querySelector('[data-area=resize] > div'));

                            expect(imageEditor.querySelectorAll('[data-area=resize].active').length).to.equal(1);


                            var disableRatioBtn = imageEditor.querySelector('[data-area=resize].active').querySelector('.jodit_btn_radio_group button:last-child');

                            expect(disableRatioBtn).not.to.equal(null);
                            simulateEvent('click', 0, disableRatioBtn);


                            var resizer = imageEditor.querySelector('.jodit_image_editor_resizer');

                            expect(resizer).not.to.equal(null);

                            var oldRatio = resizer.offsetWidth / resizer.offsetHeight;

                            simulateEvent('mousedown', 0, resizer.querySelector('.jodit_bottomright'), function (e) {
                                var pos = editor.helper.offset(resizer, editor);
                                e.clientX = pos.left + pos.width;
                                e.clientY = pos.top + pos.height;
                            });

                            simulateEvent('mousemove', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(resizer, editor);
                                e.clientX = pos.left + pos.width - 50;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            simulateEvent('mouseup', 0, editor.ownerWindow, function (e) {
                                var pos = editor.helper.offset(resizer, editor);
                                e.clientX = pos.left + pos.width - 50;
                                e.clientY = pos.top + pos.height - 150;
                            });

                            expect(Math.abs(resizer.offsetWidth / resizer.offsetHeight - oldRatio) > 1).to.be.equal(true);

                            done();
                        });

                        simulateEvent('mousedown', 0, dialog.querySelector('a.jodit_use_image_editor'));
                    }).timeout(7000);
                });
            });
        });
    });
    describe('Search plugin', function () {
        describe('CTRL + F', function () {
            it('Should show search form and query field must have focus', function () {
                var editor = new Jodit(appendTestArea(), {
                    observer: {
                        timeout: 0
                    }
                });
                var search = editor.container.querySelector('.jodit_search');
                expect(false).to.equal(search.classList.contains('jodit_search-active'));
                simulateEvent('keydown', Jodit.KEY_F, editor.editor, function (options) {
                    options.ctrlKey = true
                });
                expect(true).to.equal(search.classList.contains('jodit_search-active'));
                expect(true).to.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));
            });
        });
        describe('CTRL + R', function () {
            it('Should show search and replace form and query field must have focus', function () {
                var editor = new Jodit(appendTestArea(), {
                    observer: {
                        timeout: 0
                    }
                });

                var search = editor.container.querySelector('.jodit_search');
                expect(false).to.equal(search.classList.contains('jodit_search-active'));
                simulateEvent('keydown', Jodit.KEY_R, editor.editor, function (options) {
                    options.ctrlKey = true
                });
                expect(true).to.equal(search.classList.contains('jodit_search-active'));
                expect(true).to.equal(search.classList.contains('jodit_search-and-replace'));
                expect(true).to.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));
            });
            describe('Press Replace button', function () {
                it('Should replace value form query field to value from replace field in editor', function () {
                    var editor = new Jodit(appendTestArea(), {
                        observer: {
                            timeout: 0
                        }
                    });

                    editor.setEditorValue('test test test')

                    var search = editor.container.querySelector('.jodit_search');
                    expect(false).to.equal(search.classList.contains('jodit_search-active'));
                    simulateEvent('keydown', Jodit.KEY_R, editor.editor, function (options) {
                        options.ctrlKey = true
                    });
                    expect(true).to.be.equal(search.classList.contains('jodit_search-active'));
                    expect(true).to.be.equal(search.classList.contains('jodit_search-and-replace'));
                    expect(true).to.be.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));

                    var query = search.querySelector('.jodit_search-query');
                    var replace = search.querySelector('.jodit_search-replace');
                    var replaceButton = search.querySelector('.jodit_search_buttons-replace');

                    query.value = 't';
                    replace.value = 'w';

                    simulateEvent('click', 0, replaceButton);
                    simulateEvent('click', 0, replaceButton);
                    simulateEvent('click', 0, replaceButton);
                    simulateEvent('click', 0, replaceButton);

                    expect('wesw wesw test').to.be.equal(editor.getEditorValue());
                });
            });
        });
        describe('F3 after search', function () {
            it('Should find a next match', function () {

                var editor = new Jodit(appendTestArea(), {
                    observer: {
                        timeout: 0
                    }
                });

                editor.setEditorValue('test test test')
                var range = editor.editorDocument.createRange();
                range.setStart(editor.editor.firstChild, 0)
                range.setEnd(editor.editor.firstChild, 4)
                editor.selection.selectRange(range);

                var search = editor.container.querySelector('.jodit_search');
                expect(false).to.equal(search.classList.contains('jodit_search-active'));

                // press ctrl(cmd) + f
                simulateEvent('keydown', Jodit.KEY_F, editor.editor, function (options) {
                    options.ctrlKey = true
                });

                expect(true).to.equal(search.classList.contains('jodit_search-active'));
                expect(true).to.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));

                editor.selection.removeMarkers();
                Jodit.modules.Helpers.normalizeNode(editor.editor.firstChild); // because Select module splits text node

                editor.events.fire('searchNext');

                simulateEvent('keydown', Jodit.KEY_F3, editor.editor, function (options) {
                    options.shiftKey = false
                }); //



                var sel = editor.editorWindow.getSelection();

                expect(1).to.equal(sel.rangeCount);
                range = sel.getRangeAt(0);

                expect(editor.editor.firstChild).to.equal(range.startContainer);
                expect(5).to.equal(range.startOffset);

                expect(editor.editor.firstChild).to.equal(range.endContainer);
                expect(9).to.equal(range.endOffset);
            });
            it('Should find the next match in a circle', function () {

                var editor = new Jodit(appendTestArea(), {
                    observer: {
                        timeout: 0
                    }
                });

                editor.setEditorValue('test test test');

                var range = editor.editorDocument.createRange();
                range.setStart(editor.editor.firstChild, 0)
                range.setEnd(editor.editor.firstChild, 1)
                editor.selection.selectRange(range);

                var search = editor.container.querySelector('.jodit_search');
                expect(false).to.equal(search.classList.contains('jodit_search-active'));

                // press ctrl(cmd) + f
                simulateEvent('keydown', Jodit.KEY_F, editor.editor, function (options) {
                    options.ctrlKey = true
                });

                expect(true).to.equal(search.classList.contains('jodit_search-active'));
                expect(true).to.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));

                editor.selection.removeMarkers();
                Jodit.modules.Helpers.normalizeNode(editor.editor.firstChild); // because Select module splits text node

                var sel = editor.editorWindow.getSelection();

                editor.events.fire('searchNext');
                [
                    [3, 4],
                    [5, 6],
                    [8, 9],
                    [10, 11],
                    [13, 14],
                    [0, 1],
                    [3, 4],
                ].forEach(function (pars) {
                    simulateEvent('keydown', Jodit.KEY_F3, editor.editor, function (options) {
                        options.shiftKey = false
                    }); //

                    expect(1).to.equal(sel.rangeCount);
                    range = sel.getRangeAt(0);

                    expect(pars[0]).to.equal(range.startOffset);
                    expect(pars[1]).to.equal(range.endOffset);
                })

            });
            describe('with SHIFT key', function () {
                it('Should find a previous match', function () {

                    var editor = new Jodit(appendTestArea(), {
                        observer: {
                            timeout: 0
                        }
                    });

                    editor.setEditorValue('test test test');

                    var range = editor.editorDocument.createRange();
                    range.setStart(editor.editor.firstChild, 0);
                    range.setEnd(editor.editor.firstChild, 4);
                    editor.selection.selectRange(range);

                    var search = editor.container.querySelector('.jodit_search');
                    expect(false).to.equal(search.classList.contains('jodit_search-active'));

                    // press ctrl(cmd) + f
                    simulateEvent('keydown', Jodit.KEY_F, editor.editor, function (options) {
                        options.ctrlKey = true
                    });

                    expect(true).to.equal(search.classList.contains('jodit_search-active'));
                    expect(true).to.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));

                    editor.selection.removeMarkers();
                    Jodit.modules.Helpers.normalizeNode(editor.editor.firstChild); // because Select module splits text node

                    editor.events.fire('searchNext');

                    simulateEvent('keydown', Jodit.KEY_F3, editor.editor, function (options) {
                        options.shiftKey = true
                    }); //



                    var sel = editor.editorWindow.getSelection();

                    expect(1).to.equal(sel.rangeCount);
                    range = sel.getRangeAt(0);

                    expect(editor.editor.firstChild).to.equal(range.startContainer);
                    expect(10).to.equal(range.startOffset);

                    expect(editor.editor.firstChild).to.equal(range.endContainer);
                    expect(14).to.equal(range.endOffset);
                });
            });
        });
        describe('Esc in query field', function () {
            it('Should hide search form and restore selection', function () {
                var editor = new Jodit(appendTestArea(), {
                    observer: {
                        timeout: 0
                    }
                });
                editor.setEditorValue('<p>text</p>');
                var range = editor.editorDocument.createRange();
                range.setStart(editor.editor.firstChild.firstChild, 1)
                range.setEnd(editor.editor.firstChild.firstChild, 3);
                var sel = editor.editorWindow.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                var search = editor.container.querySelector('.jodit_search');
                expect(false).to.equal(search.classList.contains('jodit_search-active'));
                simulateEvent('keydown', Jodit.KEY_F, editor.editor, function (options) {
                    options.ctrlKey = true
                });
                expect(true).to.equal(search.classList.contains('jodit_search-active'));
                expect(true).to.equal(editor.ownerDocument.activeElement === search.querySelector('.jodit_search-query'));
                simulateEvent('keydown', 27, search.querySelector('.jodit_search-query'));
                expect(false).to.equal(search.classList.contains('jodit_search-active'));
                expect('ex').to.equal(sel.toString());
            });
        });
        describe('Unit test compare string', function () {
            describe('Get index of found string', function () {
                it('Should find needle in haystack', function () {
                    var str = 'Mr John Smith washed window';
                    expect(11).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', str));
                    expect(11).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('TH WAS', str));
                    expect(false).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('TH WASNT', str));
                });
                it('Should find needle in haystack steb by step', function () {
                    var str = 'Mr John Smith washed window';
                    expect(false).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr'));
                    expect(false).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr John'));

                    expect(11).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr John Smith'));
                    expect(11).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr John Smith wa'));
                    expect(false).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr John Smith s'));

                    expect(11).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr John Smith washed'));
                    expect(11).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Mr John Smith washed window'));
                });
                it('Should find needle in haystack steb by step in back direction', function () {
                    var str = 'Mr John Smith washed window';
                    expect(false).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'window', false));
                    expect(0).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'washed window', false));
                    expect(0).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'h washed window', false));
                    expect(3).to.be.equal(Jodit.plugins.search.getSomePartOfStringIndex('th was', 'Smith washed window', false));
                });
            });
            describe('Compare strings and return boolean', function () {
                it('Should find needle in haystack', function () {
                    var str = 'Mr John Smith washed window';
                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', str));
                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('TH WAS', str));
                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('TH  WAS', str));
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('TH WASNT', str));
                });
                it('Should find needle in haystack steb by step', function () {
                    var str = 'Mr John Smith washed window';
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr'));
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John'));

                    expect('th').to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John Smith'));
                    expect('th wa').to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John Smith wa'));
                    expect('th wa').to.be.equal(Jodit.plugins.search.findSomePartOfString('th  was', 'Mr John Smith wa'));
                    expect('th  wa').to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John Smith  wa'));
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John Smith s'));

                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John Smith washed'));
                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('th  was', 'Mr John Smith washed'));
                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Mr John Smith washed window'));
                });
                it('Should find needle in haystack steb by step in back direction', function () {
                    var str = 'Mr John Smith washed window';
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'window', false));
                    expect('was').to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'washed window', false));
                    expect('h was').to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'h washed window', false));
                    expect(true).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', 'Smith washed window', false));
                });

            });
            describe('Haystack less needle', function () {
                it('Should return false', function () {
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('th was', ' ', true));
                    expect(false).to.be.equal(Jodit.plugins.search.findSomePartOfString('Smith washed window', 'washed', true));
                });
            });
        });
        describe('Fire search event', function () {
            it('Should select some elements which consists query string', function () {
                var editor = new Jodit(appendTestArea(), {
                    observer: {
                        timeout: 0
                    }
                });
                editor.setEditorValue('<p><span>Mr</span> <span>John</span> <span>Smith</span> <span>washed</span> <span>window</span></p>');
                var sel = editor.editorWindow.getSelection();
                sel.removeAllRanges();

                editor.events.fire('search', 'th was');
                expect(1).to.be.equal(sel.rangeCount);
                var range = sel.getRangeAt(0);

                expect(editor.editor.firstChild.childNodes[4].firstChild).to.be.equal(range.startContainer);
                expect(3).to.be.equal(range.startOffset);

                expect(editor.editor.firstChild.childNodes[6].firstChild).to.be.equal(range.endContainer);
                expect(3).to.be.equal(range.startOffset);
            });
        });
    });
    describe('Indent plugin', function () {
        describe('Check i18n tooltip', function () {
            it('Should have different tooltip for each language', function () {
                var area = appendTestArea();
                var editor = new Jodit(area, {
                    buttons: 'indent,outdent',
                    language: 'en'
                });
                expect(null).to.be.not.equal(editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent [title]'));
                var title = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent [title]').getAttribute('title');
                editor.destruct();


                var editor = new Jodit(area, {
                    buttons: 'indent,outdent',
                    language: 'ru'
                });
                expect(null).to.be.not.equal(editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent [title]'));

                expect(title).to.be.not.equal(editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent [title]').getAttribute('title'));

            });
        });
        it('Should set active outdent button if current container has marginLeft', function () {
            var area = appendTestArea();
            var editor = new Jodit(area, {
                buttons: 'indent,outdent'
            });
            editor.setEditorValue('<p>text</p>');
            editor.selection.setCursorIn(editor.editor.firstChild.firstChild);

            simulateEvent('mousedown', 0, editor.editor.firstChild);

            expect(null).to.be.not.equal(editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent.jodit_disabled'));

            editor.editor.firstChild.style.marginLeft = '100px'
            simulateEvent('mousedown', 0, editor.editor.firstChild);
            expect(null).to.be.equal(editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent.jodit_disabled'));

        });
        describe('Press Indent button', function () {
            it('Should increase indent for current blocks', function () {
                var area = appendTestArea();
                var editor = new Jodit(area, {
                    buttons: 'indent,outdent',
                    indentMargin: 5,
                });
                editor.setEditorValue('<h1>test</h1><p>text</p><p>text</p>');
                var range = editor.editorDocument.createRange();
                range.setStartBefore(editor.editor.firstChild)
                range.setEndAfter(editor.editor.firstChild.nextSibling)
                editor.selection.selectRange(range);
                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-indent'));
                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-indent'));
                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-indent'));

                expect('<h1 style="margin-left: 15px;">test</h1><p style="margin-left: 15px;">text</p><p>text</p>').to.be.equal(editor.getEditorValue());

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent'));
                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent'));
                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-outdent'));

                expect('<h1>test</h1><p>text</p><p>text</p>').to.be.equal(editor.getEditorValue());

            });
        });
    });
    describe('Symbols plugin', function () {
        it('Should create symbol button in toolbar and after click open dialog with symbols', function () {
            var area = appendTestArea();
            var editor = new Jodit(area, {
                buttons: 'symbol',
            });
            editor.setEditorValue('test');

            var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
            expect(null).to.be.not.equal(btn);

            simulateEvent('mousedown', 0, btn);
            var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
            expect(null).to.be.not.equal(dialog);

        });
        describe('Symbols dialog', function () {
            it('Should have focus on first element after open', function () {
                var area = appendTestArea();
                var editor = new Jodit(area, {
                    buttons: 'symbol',
                });
                editor.setEditorValue('test');

                var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                expect(null).to.be.not.equal(btn);

                simulateEvent('mousedown', 0, btn);
                var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                expect(null).to.be.not.equal(dialog);


                expect(dialog.querySelector('a')).to.be.equal(editor.ownerDocument.activeElement);
            });
            describe('Press key left', function () {
                it('Should select previous element', function () {
                    var area = appendTestArea();
                    var editor = new Jodit(area, {
                        buttons: 'symbol',
                    });
                    editor.setEditorValue('test');

                    var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                    expect(null).to.be.not.equal(btn);

                    simulateEvent('mousedown', 0, btn);
                    var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                    expect(null).to.be.not.equal(dialog);

                    var currentActive = dialog.getElementsByTagName('a')[10];

                    simulateEvent('keydown', Jodit.KEY_LEFT, currentActive, function (data) {
                        data.target = currentActive;
                    });

                    expect(editor.ownerDocument.activeElement).to.be.equal(dialog.getElementsByTagName('a')[9]);
                });
            });
            describe('Press key right', function () {
                it('Should select next element', function () {
                    var area = appendTestArea();
                    var editor = new Jodit(area, {
                        buttons: 'symbol',
                    });
                    editor.setEditorValue('test');

                    var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                    expect(null).to.be.not.equal(btn);

                    simulateEvent('mousedown', 0, btn);
                    var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                    expect(null).to.be.not.equal(dialog);

                    var currentActive = dialog.getElementsByTagName('a')[10];

                    simulateEvent('keydown', Jodit.KEY_RIGHT, currentActive, function (data) {
                        data.target = currentActive;
                    });

                    expect(editor.ownerDocument.activeElement).to.be.equal(dialog.getElementsByTagName('a')[11]);
                });
            });
            describe('Press key top', function () {
                it('Should select element above', function () {
                    var area = appendTestArea();
                    var editor = new Jodit(area, {
                        buttons: 'symbol',
                    });
                    editor.setEditorValue('test');

                    var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                    expect(null).to.be.not.equal(btn);

                    simulateEvent('mousedown', 0, btn);
                    var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                    expect(null).to.be.not.equal(dialog);

                    var currentActive = dialog.getElementsByTagName('a')[30];

                    simulateEvent('keydown', Jodit.KEY_TOP, currentActive, function (data) {
                        data.target = currentActive;
                    });

                    expect(editor.ownerDocument.activeElement).to.be.equal(dialog.getElementsByTagName('a')[13]);


                    currentActive = dialog.getElementsByTagName('a')[10];

                    simulateEvent('keydown', Jodit.KEY_TOP, currentActive, function (data) {
                        data.target = currentActive;
                    });

                    expect(editor.ownerDocument.activeElement).to.be.equal(dialog.getElementsByTagName('a')[197]);
                });
            });
            describe('Press key bottom', function () {
                it('Should select element below', function () {
                    var area = appendTestArea();
                    var editor = new Jodit(area, {
                        buttons: 'symbol',
                    });
                    editor.setEditorValue('test');

                    var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                    expect(null).to.be.not.equal(btn);

                    simulateEvent('mousedown', 0, btn);
                    var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                    expect(null).to.be.not.equal(dialog);

                    var currentActive = dialog.getElementsByTagName('a')[30];

                    simulateEvent('keydown', Jodit.KEY_BOTTOM, currentActive, function (data) {
                        data.target = currentActive;
                    });

                    expect(editor.ownerDocument.activeElement).to.be.equal(dialog.getElementsByTagName('a')[47]);


                    currentActive = dialog.getElementsByTagName('a')[200];

                    simulateEvent('keydown', Jodit.KEY_BOTTOM, currentActive, function (data) {
                        data.target = currentActive;
                    });

                    expect(editor.ownerDocument.activeElement).to.be.equal(dialog.getElementsByTagName('a')[13]);
                });
            });
            describe('Press Enter or mousdown on element', function () {
                it('Should insert character', function () {
                    var area = appendTestArea();
                    var editor = new Jodit(area, {
                        buttons: 'symbol',
                    });

                    editor.setEditorValue('test');

                    var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                    expect(null).to.be.not.equal(btn);

                    simulateEvent('mousedown', 0, btn);
                    var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                    expect(null).to.be.not.equal(dialog);

                    var currentActive = dialog.getElementsByTagName('a')[5];

                    simulateEvent('keydown', Jodit.KEY_ENTER, currentActive);

                    expect('&amp;test').to.be.equal(editor.getEditorValue());

                    simulateEvent('mousedown', 0, btn);
                    dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                    expect(null).to.be.not.equal(dialog);

                    var currentActive = dialog.getElementsByTagName('a')[125];

                    simulateEvent('mousedown', 0, currentActive);

                    expect('&amp;½test').to.be.equal(editor.getEditorValue());

                });
            });
        });
        describe('Symbols popup', function () {
            it('Should create popup this symbols', function () {
                var area = appendTestArea();
                var editor = new Jodit(area, {
                    buttons: 'symbol',
                    usePopupForSpecialCharacters: true
                });

                editor.setEditorValue('test');
                var range = editor.editorDocument.createRange();
                range.setStart(editor.editor.firstChild, 0);
                range.collapse(true)
                editor.selection.selectRange(range)

                var btn = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-symbol');
                expect(null).to.be.not.equal(btn);

                simulateEvent('mousedown', 0, btn);
                var dialog = editor.ownerDocument.querySelector('.jodit_dialog_box.active.jodit_modal .jodit_dialog_content .jodit_symbols');
                expect(null).to.be.equal(dialog);

                var popup = editor.container.querySelector('.jodit_toolbar_popup');
                expect(null).to.be.not.equal(popup);
                expect('block').to.be.equal(window.getComputedStyle(popup).display);

                var currentActive = popup.getElementsByTagName('a')[125];

                simulateEvent('mousedown', 0, currentActive);

                expect('½test').to.be.equal(editor.getEditorValue());
                expect(null).to.be.equal(popup.parentNode);
            });
        });
    });
    describe('Hotkeys', function () {
        describe('Override default shortcuts for some commands', function () {
            it('Should work default shortcuts for another commands', function () {
                var area = appendTestArea(),
                    editor = new Jodit(area, {
                        commandToHotkeys: {
                            bold: 'ctrl+shift+b',
                            italic: ['ctrl+i', 'ctrl+shift+i'],
                        }
                    });

                editor.setEditorValue('test test test')
                var range = editor.editorDocument.createRange();
                range.setStart(editor.editor.firstChild, 4);
                range.setEnd(editor.editor.firstChild, 8);
                editor.selection.selectRange(range);

                // standart ctrl+u
                simulateEvent('keydown', 85, editor.editor, function (data) {
                    // data.shiftKey = true;
                    data.ctrlKey = true;
                });

                expect('test<u> tes</u>t test').to.be.equal(editor.getEditorValue());
            });
            describe('Replace ctrl+b to ctrl+shift+b for bold command', function () {
                it('Should not execute bold on ctrl+b', function () {
                    var area = appendTestArea(),
                        editor = new Jodit(area, {
                            commandToHotkeys: {
                                bold: 'ctrl+shift+b',
                                italic: ['ctrl+i', 'ctrl+shift+i'],
                            }
                        });
                    editor.setEditorValue('test test test')
                    var range = editor.editorDocument.createRange();
                    range.setStart(editor.editor.firstChild, 4);
                    range.setEnd(editor.editor.firstChild, 8);
                    editor.selection.selectRange(range);

                    // standart ctrl+b
                    simulateEvent('keydown', 66, editor.editor, function (data) {
                        // data.shiftKey = true;
                        data.ctrlKey = true;
                    });

                    expect('test test test').to.be.equal(editor.getEditorValue()); // should not sork

                    simulateEvent('keydown', 66, editor.editor, function (data) {
                        data.shiftKey = true;
                        data.ctrlKey = true;
                    });

                    expect('test<strong> tes</strong>t test').to.be.equal(editor.getEditorValue());
                });
                it('Should execute bold on ctrl+shift+b', function () {
                    var area = appendTestArea(),
                        editor = new Jodit(area, {
                            commandToHotkeys: {
                                bold: 'ctrl+shift+b',
                                italic: ['ctrl+i', 'ctrl+shift+i'],
                            }
                        });
                    editor.setEditorValue('test test test')
                    var range = editor.editorDocument.createRange();
                    range.setStart(editor.editor.firstChild, 4);
                    range.setEnd(editor.editor.firstChild, 8);
                    editor.selection.selectRange(range);

                    simulateEvent('keydown', 66, editor.editor, function (data) {
                        data.shiftKey = true;
                        data.ctrlKey = true;
                    });

                    expect('test<strong> tes</strong>t test').to.be.equal(editor.getEditorValue());
                });
            });
            describe('Add ctrl+shift+i to default ctrl+i shortcut for italic command', function () {
                it('Should work with each of shortcuts', function () {
                    var area = appendTestArea(),
                        editor = new Jodit(area, {
                            commandToHotkeys: {
                                bold: 'ctrl+shift+b',
                                italic: ['ctrl+i', 'ctrl+shift+i'],
                            }
                        });

                    editor.setEditorValue('test test test')
                    var range = editor.editorDocument.createRange();
                    range.setStart(editor.editor.firstChild, 4);
                    range.setEnd(editor.editor.firstChild, 8);
                    editor.selection.selectRange(range);

                    // standart ctrl+i
                    simulateEvent('keydown', 73, editor.editor, function (data) {
                        // data.shiftKey = true;
                        data.ctrlKey = true;
                    });

                    expect('test<em> tes</em>t test').to.be.equal(editor.getEditorValue());

                    editor.setEditorValue('test test test')
                    var range = editor.editorDocument.createRange();
                    range.setStart(editor.editor.firstChild, 4);
                    range.setEnd(editor.editor.firstChild, 8);
                    editor.selection.selectRange(range);

                    // standart ctrl+shift+i
                    simulateEvent('keydown', 73, editor.editor, function (data) {
                        data.shiftKey = true;
                        data.ctrlKey = true;
                    });

                    expect('test<em> tes</em>t test').to.be.equal(editor.getEditorValue());

                    // standart ctrl+shift+7
                    simulateEvent('keydown', 103, editor.editor, function (data) {
                        data.shiftKey = true;
                        data.ctrlKey = true;
                    });

                    expect('<ol><li>test<em> tes</em>t test</li></ol>').to.be.equal(editor.getEditorValue().replace('<br>', ''));
                });
            });
        });
    });
    describe('Sticky plugin', function () {
        describe('Without scrolling', function () {
            it('Should not have `jodit_sticky` class and toolbar must be in normal state', function () {
                var area = appendTestArea(),
                    editor = new Jodit(area);

                editor.setEditorValue('<p>stop</p>'.repeat(100));
                expect(false).to.be.equal(editor.container.classList.contains('jodit_sticky'));
            });
        });
        describe('Create editor in page with long text', function () {
            describe('and scroll page to bottom', function () {
                it('Should add to editor class `jodit_sticky` and toolbar must be always on the top', function () {
                    var area = appendTestArea(),
                        editor = new Jodit(area);

                    editor.setEditorValue('<p>stop</p>'.repeat(100));
                    var offset = Jodit.modules.Helpers.offset(editor.container, editor);

                    window.scroll(0, offset.top + offset.height / 2); // scroll page to bottom
                    simulateEvent('scroll', 0, window);

                    expect(true).to.be.equal(editor.container.classList.contains('jodit_sticky'));
                    expect(0).to.be.equal(editor.toolbar.container.getBoundingClientRect().top);
                });
                describe('add offset for toolbar', function () {
                    it('Should add offset for sticky toolbar', function () {
                        var area = appendTestArea(),
                            editor = new Jodit(area, {
                                toolbarStickyOffset: 100
                            });

                        editor.setEditorValue('<p>stop</p>'.repeat(100));
                        var offset = Jodit.modules.Helpers.offset(editor.container, editor);

                        window.scroll(0, offset.top + offset.height / 2); // scroll page to bottom
                        simulateEvent('scroll', 0, window);

                        expect(true).to.be.equal(editor.container.classList.contains('jodit_sticky'));
                        expect(100).to.be.equal(editor.toolbar.container.getBoundingClientRect().top);
                    });
                });
                describe('with toolbarSticky false', function () {
                    it('Should do nothing with toolbar', function () {
                        var area = appendTestArea(),
                            editor = new Jodit(area, {
                                toolbarStickyOffset: 100,
                                toolbarSticky: false
                            });

                        editor.setEditorValue('<p>stop</p>'.repeat(100));
                        var offset = Jodit.modules.Helpers.offset(editor.container, editor);

                        window.scroll(0, offset.top + offset.height / 2); // scroll page to bottom
                        simulateEvent('scroll', 0, window);

                        expect(false).to.be.equal(editor.container.classList.contains('jodit_sticky'));
                        expect(100).to.be.not.equal(editor.toolbar.container.getBoundingClientRect().top);
                        expect(0).to.be.not.equal(editor.toolbar.container.getBoundingClientRect().top);
                    });
                });
            });

            describe('and scroll page to the top', function () {
                it('Should remove class `jodit_sticky` from editor and toolbar must have normal position', function () {
                    var area = appendTestArea(),
                        editor = new Jodit(area),
                        brs = [0,0,0,0,0,0,0,0,0].map(function () {
                            return editor.ownerDocument.createElement('br');
                        });

                    brs.forEach(function (br) {
                        editor.container.parentNode.insertBefore(br, editor.container);
                    });

                    editor.setEditorValue('<p>stop</p>'.repeat(100));
                    var offset = Jodit.modules.Helpers.offset(editor.container, editor);

                    window.scroll(0, offset.top - 200); // scroll page above editor
                    simulateEvent('scroll', 0, window);

                    expect(false).to.be.equal(editor.container.classList.contains('jodit_sticky'));

                    expect(5).to.be.above(Math.abs(200 - editor.toolbar.container.getBoundingClientRect().top));

                    brs.forEach(function (br) {
                        br.parentNode.removeChild(br);
                    });
                });
            });
        });
    });
    describe('Clean html plugin', function () {
        describe('Click remove format button', function () {
            it('Should clear selected HTML fragment', function () {
                var area = appendTestArea(),
                    editor = new Jodit(area);

                editor.setEditorValue('start <span style="background-color: red; color: blue;">test test test</span> elm')
                var range = editor.editorDocument.createRange();
                range.setStartBefore(editor.editor.querySelector('span'));
                range.setEndAfter(editor.editor.querySelector('span'));
                editor.selection.selectRange(range);

                var button = editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-eraser');
                expect(null).to.be.not.equal(button);

                simulateEvent('mousedown', 0, button);

                expect('start test test test elm').to.be.equal(editor.getEditorValue().replace('<span>', '').replace('</span>', ''));
            });
        });
    });
    afterEach(function () {
        removeStuff();
        var i, keys = Object.keys(Jodit.instances);
        for (i = 0; i < keys.length; i += 1) {
            Jodit.instances[keys[i]].destruct();
        }
    });
});