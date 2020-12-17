let slide = `
<GridLayout id="chills" row="0" rows="auto, *, *, *, *, *, *">
    <Label row="0" text="{{ chillsQuery }}" textWrap="true" fontSize="{{ mySize }}" class="questionText text-center" />
    <Button row="2" id="0" text="{{ chillsAnswer0 }}" fontSize="{{ mySize }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ chillsAnswer1 }}" fontSize="{{ mySize }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ chillsAnswer2 }}" fontSize="{{ mySize }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
    <Button row="5" id="2" text="{{ chillsAnswer3 }}" fontSize="{{ mySize }}" class="-btn my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
    <Button row="6" id="2" text="{{ chillsAnswer4 }}" fontSize="{{ mySize }}" class="-btn my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
