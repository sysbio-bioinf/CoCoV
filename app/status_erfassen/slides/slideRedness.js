let slide = `
<GridLayout id="redness" row="0" rows="auto, *, *, *, *, *, *">
    <Label id="questionLabel" row="0" text="{{ rednessQuery }}"  textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ rednessAnswer0 }}" textWrap="true"   class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ rednessAnswer1 }}" textWrap="true"  class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ rednessAnswer2 }}" textWrap="true"  class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
    <Button row="5" id="3" text="{{ rednessAnswer3 }}" textWrap="true"  class="-btn my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
    <Button row="6" id="4" text="{{ rednessAnswer4 }}" textWrap="true"  class="-btn my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};