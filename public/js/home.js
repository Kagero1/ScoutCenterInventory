'use strict';
var files_upload = new Array();
var res;
const container = document.getElementsByClassName('label_container');
$(document).ready(function(){
    var isAdvancedUpload = function() {
        var div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
      }();

    var forms = document.querySelectorAll('.box');
    Array.prototype.forEach.call(forms, function(form){
        var input    = form.querySelector('input[type="file"]'),
        errorMsg     = form.querySelector('.box_error span'),
        redirect     = form.querySelectorAll('.box_redirect'),
        droppedFiles = false,
        showFiles = function(files) {
            makeLabel(files);
        };

        input.addEventListener('change', function(e){
            droppedFiles = e.target.files;
            Array.prototype.forEach.call(droppedFiles, function(file){
                var flag = 0;
                if(files_upload.length >= 1){
                    Array.prototype.forEach.call(files_upload, function(f){
                        if(f.name.localeCompare(file.name) == 0){
                            flag = 1;
                        }
                    })
                }
                if(flag == 0){
                    showFiles(file);
                    addFile(file);
                    console.log(files_upload);
                }else{
                    alert("Unable to upload the same file.")
                }
            })
        });

        if(isAdvancedUpload){
            form.classList.add('has-advanced-upload');

            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function(event){
                form.addEventListener(event, function(e){
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragover', 'dragenter'].forEach(function(event){
                form.addEventListener(event, function(){
                    form.classList.add('is-dragover');
                });
            });

            ['dragleave', 'dragend', 'drop'].forEach(function(event){
                form.addEventListener(event, function(){
                    form.classList.remove('is-dragover');
                });
            });

            form.addEventListener('drop', function(e){
                droppedFiles = e.dataTransfer.files;
                Array.prototype.forEach.call(droppedFiles, function(file){
                    var flag = 0;
                    if(files_upload.length >= 1){
                        Array.prototype.forEach.call(files_upload, function(f){
                            if(f.name.localeCompare(file.name) == 0){
                                flag = 1;
                            }
                        })
                    }
                    if(flag == 0){
                        showFiles(file);
                        addFile(file);
                        console.log(files_upload);
                    }else{
                        alert("Unable to upload the same file.");
                    }
                })
                
            });
        }

        $("#uploadBtn").on('click', function(){
          console.log(files_upload.length);
            if (files_upload.length == 0) return;
            else{
              Array.prototype.forEach.call(files_upload, function(file){
                    handleFiles(file);
              });
              alert("File Upload Finished.");
              removeAllFiles();
            } 
        });

        Array.prototype.forEach.call(redirect, function(entry){
            entry.addEventListener('click', function(e){
                e.preventDefault();
                form.classList.remove('is-error', 'is-success');
                input.click();
            });
        });

        input.addEventListener('focus', function(){
            input.classList.add('has-focus');
        });

        input.addEventListener('blur', function(){
            input.classList.remove('has-focus');
        });
    });
});


function handleFiles(uploadedFile){
  console.log("Handling File");
  Papa.parse(uploadedFile, {
    header: true,
    complete: function(results) {
      console.log("File Handle Complete");
      res = results;
      console.log(results);
      $.ajax({
        url:"upload",
        method:"POST",
        data:{
            items: results.data
        },
        success: function(result){
            if(result == "OK"){
                alert("Inventory Successfully Updated");
            }else{
                alert("Encountered some error while uploading");
            }
        }
      });

    }
  });
}

function makeLabel(f){
    container.innerHTML = "";
    var $fileData = $("<div>", {id: f.name, "class": "file-data"});
    var $fileName = $("<div>", {"class": "file-name"})
    $fileName.text(f.name);
    var $removeBtn = $("<button>", {"class": "file-remove", "type": "button"});
    $removeBtn.text("X");
    $removeBtn.on('click', function(){
        console.log("clicked")
        removeFile(f.name);
        removeDiv($fileData);
    })
    $fileData.append($fileName);
    $fileData.append($removeBtn);
    $fileData.hide();
    $("#uploadedFiles").append($fileData);
    $fileData.show(500);
}

function addFile(file){
    pushFile(file);
}

function removeFile(name){
    for (let i = 0; i < files_upload.length; i++) {
        if(files_upload[i].name.localeCompare(name) == 0){
            files_upload.splice(i, 1);
            return false;
        }
    }
}

function removeAllFiles(){
  files_upload.splice(0, files_upload.length);
  $("#uploadedFiles").empty();
}

function removeDiv($target){
    $target.hide('slow', function(){ $target.remove(); });
}


function pushFile(file){
    files_upload.push(file);
}