import { UIAlertController, UIAlertAction } from 'UIKit';
import { UIKit } from 'UIKit';
import { TiApp } from 'Titanium/TiApp';

const UIAlertControllerStyleAlert = UIKit.UIAlertControllerStyleAlert;
const UIAlertControllerStyleActionSheet = UIKit.UIAlertControllerStyleActionSheet;
const UIAlertActionStyleDefault = UIKit.UIAlertActionStyleDefault;
const UIAlertActionStyleDestructive = UIKit.UIAlertActionStyleDestructive;
const UIAlertActionStyleCancel = UIKit.UIAlertActionStyleCancel;

function showAlertWithStyle(style) {
	const alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
		'My Title',
		'My Message',
		style
	);

	const alertAction = UIAlertAction.actionWithTitleStyleHandler('OK', UIAlertActionStyleDefault, () => {
		$.notice.text = 'Clicked OK!';
	});
		
	const cancelAction = UIAlertAction.actionWithTitleStyleHandler('Cancel', UIAlertActionStyleCancel, () => {
		$.notice.text = 'Clicked Cancel!';
	});
	
	const destructiveAction = UIAlertAction.actionWithTitleStyleHandler('Delete', UIAlertActionStyleDestructive, () => {
		$.notice.text = 'Clicked Delete!';
	});

	alertController.addAction(alertAction);
	alertController.addAction(destructiveAction);
	alertController.addAction(cancelAction);

	// Get the native UIViewController and present it
	TiApp.getController().presentViewControllerAnimatedCompletion(alertController, true, () => {
		Ti.API.info('Presented!');
	});

	// Alternative: Use the showModalController utility!
	// TiApp.app().showModalController(alertController, true);
}

function showAlert() {
	showAlertWithStyle(UIAlertControllerStyleAlert);
}

function showOptions() {
	showAlertWithStyle(UIAlertControllerStyleActionSheet);
}
