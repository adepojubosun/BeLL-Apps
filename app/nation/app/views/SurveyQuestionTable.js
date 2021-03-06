$(function() {

    App.Views.SurveyQuestionTable = Backbone.View.extend({

        tagName: "table",
        isManager: null,
        questionArray: [],
        survayModel: null,
        className: "table table-striped",
        id:"parentDiv",
        events: {
            "click #Rearrange": function(e) {
                if ($("input[name='questionRow']").is(":visible")) {
                    $("#Rearrange").text(App.languageDictValue.attributes.Rearrange);
                    this.surveyModel.set("questions", this.questionArray);
                    this.surveyModel.save();
                    $("input[name='questionRow']").hide()
                    $("#moveup").hide()
                    $("#movedown").hide()
                } else {
                    $("#Rearrange").text(App.languageDictValue.attributes.Save);
                    $("input[name='questionRow']").show()
                    $("#moveup").show()
                    $("#movedown").show()
                }
            },
            "click #moveup": function(e) {
                var current = null;
                var radioQuestions = document.getElementsByName('questionRow');
                for (var i = 0; i < radioQuestions.length; i++) {
                    if (radioQuestions[i].checked && i > 0) {
                        current = radioQuestions[i].parentNode.parentNode;
                        var prev = current.previousSibling;
                        var parent = current.parentNode;
                        if(prev)
                        {
                            this.swap(i, i - 1);
                            parent.removeChild(current);
                            parent.insertBefore(current, prev);
                        }
                        break;
                    }
                }
            },
            "click #movedown": function(e) {
                var current = null;
                var radioQuestions = document.getElementsByName('questionRow');
                for (var i = 0; i < radioQuestions.length; i++) {
                    if (radioQuestions[i].checked && i < (radioQuestions.length - 1)) {
                        current = radioQuestions[i].parentNode.parentNode;
                        var next = current.nextSibling;
                        var parent = current.parentNode;
                        if(next)
                        {
                            this.swap(i, i + 1);
                            parent.removeChild(next);
                            parent.insertBefore(next, current);
                        }
                        break;
                    }
                }
            }
        },

        initialize: function() {
        },
        swap: function(index1, index2) {
            if(index1 > -1 && index2 > -1) {
                var c = this.questionArray[index1];
                this.questionArray[index1] = this.questionArray[index2];
                this.questionArray[index2] = c;
            }
        },
        addOne: function(model) {
            var surveyQuestionRowView = new App.Views.SurveyQuestionRow({
                model: model
            })
            surveyQuestionRowView.Id = this.Id
            surveyQuestionRowView.render()
            this.$el.append(surveyQuestionRowView.el)
        },

        addAll: function() {
            this.$el.append('<tr><th>'+App.languageDictValue.get('Questions')+'</th><th colspan="2">'+App.languageDictValue.get('Actions')+'</th></tr>')
            if (this.collection.models.length > 0) {
                this.$el.append('<tr><td>&nbsp;&nbsp;&nbsp;<button class="btn btn-success" id="Rearrange" >'+App.languageDictValue.attributes.Rearrange+'</button>&nbsp;&nbsp;&nbsp;' +
                    '<button class="btn btn-success" id="moveup" >'+App.languageDictValue.attributes.Up+'</button>&nbsp;&nbsp;&nbsp;' +
                    '<button class="btn btn-success" id="movedown" >'+App.languageDictValue.attributes.Down+'</button></td></tr>'
                )
            }
            if (this.collection.length == 0)
                this.$el.append('<tr><td colspan="2"> '+App.languageDictValue.get('empty_Survey')+' <td></tr>')
            this.collection.forEach(this.addOne, this)
        },

        render: function() {
            this.surveyModel = new App.Models.Survey;
            this.surveyModel.id = this.Id;
            this.surveyModel.fetch({async: false});
            this.questionArray = this.surveyModel.get("questions");
            this.addAll()
        }

    })

})