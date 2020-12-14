const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function SettingsViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Impressum");

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = SettingsViewModel;
