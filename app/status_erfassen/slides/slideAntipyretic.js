let slide = `
<GridLayout id="antipyretic" row="0" rows="auto, *, *, *">
    <Label row="0" text="{{ antipyreticQuery }}" fontSize="{{ mySize }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ antipyreticAnswer0 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ antipyreticAnswer1 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
