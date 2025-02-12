function generateAlphanumeric(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const addDataCid = {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'JSX 엘리먼트에 data-cid 속성 필수 적용',
      category: '잠재적 오류',
      recommended: true,
    },
    messages: {
      missingDataCid: 'JSX 엘리먼트에는 data-cid 속성이 필요합니다',
      invalidDataCid: 'data-cid는 엘리먼트이름-[8자리 영숫자] 형식이어야 합니다 (예: div-a1B2c3D4)',
    },
    schema: [
      {
        type: 'object',
        properties: {
          pattern: { type: 'string' },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const dataCidProp = node.attributes.find(
          (attr) => attr.type === 'JSXAttribute' && attr.name.name === 'data-cid'
        );

        if (!dataCidProp) {
          const nodeName = node.name.name || 'element';
          context.report({
            node,
            messageId: 'missingDataCid',
            fix(fixer) {
              const newDataCid = `${nodeName}-${generateAlphanumeric(6)}`;
              return fixer.insertTextAfter(node.name, ` data-cid="${newDataCid}"`);
            },
          });
        }
      },
    };
  },
};

export default addDataCid;
