let slide = `
<GridLayout id="vomiting" row="0" rows="auto, *, *, *, *, *, *">
    <Label row="0" text="{{ vomitingQuery }}" fontSize="{{ mySize }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ vomitingAnswer0 }}" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ vomitingAnswer1 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ vomitingAnswer2 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
    <Button row="5" id="3" text="{{ vomitingAnswer3 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
    <Button row="6" id="4" text="{{ vomitingAnswer4 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
