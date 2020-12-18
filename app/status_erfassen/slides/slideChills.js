let slide = `
<GridLayout id="chills" row="0" rows="auto, *, *">
    <Label row="0" text="{{ chillsQuery }}" textWrap="true" fontSize="{{ mySize }}" class="questionText text-center" />
    <Button row="2" id="0" text="{{ chillsAnswer0 }}" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ chillsAnswer1 }}" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
