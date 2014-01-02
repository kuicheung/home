var siquoia = {};
		
function init(){
	$("#select-topic-sub").change(updateCategory);
	updateCategory();
	
	$(".display").dataTable({
		"bJQueryUI" : true,
		"aaSorting": [[ 0, "desc" ]]
	});
}

function updateCategory(){
	$(".opt-cat").hide().attr('disabled','disabled');
	siquoia.currentTopic = $("#select-topic-sub").val();
	$(".opt-cat-"+siquoia.currentTopic).show().removeAttr('disabled');
	$("#select-category-sub")
		.val($(".opt-cat-"+siquoia.currentTopic)
		.first().val());
}

function checkIfEmpty(inputNode,errNode,error){
	if(!inputNode.val()){
		errNode.show();
		if(!error)
			inputNode.focus();
		return true;
	}
	
	errNode.hide();
	if(error)
		return true;
	else
		return false;
}

function submitClicked(){
	var error = false;			

	error = checkIfEmpty($("#text"),$("#question-error"),error);												
	error = checkIfEmpty($("#ans1"),$("#ans1-error"),error);	
	error = checkIfEmpty($("#ans2"),$("#ans2-error"),error);												
	error = checkIfEmpty($("#ans3"),$("#ans3-error"),error);
	error = checkIfEmpty($("#ans4"),$("#ans4-error"),error);												
	error = checkIfEmpty($("#correctAns"),$("#correctAns-error"),error);
	
	if(!error){
		$("#error-box").hide();
		$("#input").submit();
	}
	else
		$("#error-box").show();
}	