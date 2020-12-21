let slide = `
<GridLayout id="coronatestresult" row="0" rows="auto, *, *, *, *">
    <Label id="questionLabel" row="0" text="{{ coronaTestResultQuery }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ coronaTestResultAnswer0 }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ coronaTestResultAnswer1 }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ coronaTestResultAnswer2 }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
