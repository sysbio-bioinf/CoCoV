let slide = `
<GridLayout id="lymphNode" row="0" rows="auto, *, *, *">
    <Label row="0" text="{{ lymphNodeQuery }}" textWrap="true"  fontSize="{{ mySize }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ lymphNodeAnswer0 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ lymphNodeAnswer1 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
