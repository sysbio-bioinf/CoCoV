let slide = `
<GridLayout id="injectionPain" row="0" rows="auto, *, *, *, *, *, *">
    <Label id="questionLabel" row="0" text="{{ injectionPainQuery }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ injectionPainAnswer0 }}" textWrap="true"  class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ injectionPainAnswer1 }}" textWrap="true"  class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ injectionPainAnswer2 }}" textWrap="true"  class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
    <Button row="5" id="3" text="{{ injectionPainAnswer3 }}" textWrap="true"  class="-btn my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
    <Button row="6" id="4" text="{{ injectionPainAnswer4 }}" textWrap="true"  class="-btn my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
