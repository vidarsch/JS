this.textOverlay = function(action_def, response_id, element) {

		var smsdata = "Text";
		var headdata = "Avsändare";

		if (response_id) {
			var action = self.blockHasAction(action_def, self.activeblock);

			if (!action)
				return;
			var response = self.getResponseById(response_id, action);

			if (!response)
				return;
			smsdata = response.data1
			headdata = response.data2
		} 
		//console.log(response);
		senderList = self.smsSenders;
		$(".modal-container").html(
					'<label for=smsid> <?=gettext("Sender text")?> </label><br>'+
					'<select type="text" id=smsid>'+
					'</select>' +
					'<br><br>' +
					'<?=gettext("Text contents")?>'+
					'<textarea id="mySmsTextField" name="Text1" cols="40" rows="5">'+smsdata+'</textarea>');

		$.each(senderList, function(key, value) {   
			$('#smsid')
			.append($("<option></option>")
			.attr("value", value)
			.text(value)); 
		});

		$("#smsid").val(headdata).change();
		
		$(".modal-container").dialog("option", "buttons", {
				"<?=gettext("Save")?>": function() {
					var smsContent = $("#mySmsTextField").val();
					var smsHeader = $("#smsid").val();
					if (response) {
						var action = self.blockHasAction(action_def, self.activeblock);
						response.data1 = smsContent;
						response.data2 = smsHeader;
						self.updateResponse(response, action);

					} else {
						response = {
							response_def_name: "Sms",
							action_def_name: action_def,
							data1 : smsContent,
							data2 : smsHeader,
						};
						
						self.addResponse(action_def, self.activeblock, response);	
					}

					$('.modal-container').dialog('close');

					},
					"<?=gettext("Cancel")?>": function() {
							$(this).dialog("close");
					}
		});
		$(".modal-container").dialog("option", {title : "<?=gettext("Send text message to user")?>", modal: false, width: "300px"});
		$('.modal-container').dialog('open');
		$(".modal-container #wait-length").select();
		$('.ui-dialog-buttonpane > button:first').focus();
		$(".modal-container").dialog("widget").position({
		my: 'left top',
			at: 'left bottom',
			of: element
			});
};