let slide = `
<GridLayout id="eczema" row="0" rows="auto, *, *, *">
    <Label id="questionLabel" row="0" text="{{ eczemaQuery }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ eczemaAnswer0 }}"  class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ eczemaAnswer1 }}"  class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
