let slide = `
<GridLayout id="chills" row="0" rows="auto, *, *, *">
    <Label id="questionLabel" row="0" text="{{ chillsQuery }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ chillsAnswer0 }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ chillsAnswer1 }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
